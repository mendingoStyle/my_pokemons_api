import { Inject, Injectable } from '@nestjs/common'
import {
  Brackets,
  Connection,
  getConnectionManager,
  SelectQueryBuilder,
} from 'typeorm'
import { IQuery, IRelation } from './interface/query-params.interface'

class Param {
  alias: string
  value: any
  field: string
  identifier: string

  constructor(key, value, primaryAlias) {
    const relationAndField = key.split('.')
    this.alias = relationAndField[relationAndField.length - 2] ?? primaryAlias
    this.value = value
    this.field = relationAndField[relationAndField.length - 1]
    this.identifier = `${this.alias}.${this.field}`
  }
}

@Injectable()
export class QueryParamsService {

  getQuery(
    queryParams,
    entityTarget,
    relations: IRelation[] = [],
    connection: Connection
  ): SelectQueryBuilder<unknown> {
    const primaryAlias = entityTarget.name
    const { search, sorters, ...rest } = queryParams
    const params = Object.entries(rest).map(
      ([key, value]) => new Param(key, value, primaryAlias)
    )
    const aliases = new Set([...relations.map((r) => r.relation), primaryAlias])

    const finalQuery = connection
      .getRepository(entityTarget)
      .createQueryBuilder(primaryAlias)
      .where((query) => {
        if (relations) {
          relations.forEach(({ target, relation, join = 'left' }) => {
            const subRelation =
              relation.indexOf('.') === -1 ? null : relation.split('.')[1]
            if (join === 'left') {
              query.leftJoinAndSelect(
                `${target}.${relation}`,
                `${subRelation || relation}`
              )
            } else if (join === 'inner') {
              query.innerJoinAndSelect(
                `${target}.${relation}`,
                `${subRelation || relation}`
              )
            }
          })
        }

        aliases.forEach((alias) => {
          const aliasParams = params.filter((p) => p.alias === alias)
          aliasParams.forEach(({ value, identifier }) => {
            if (Array.isArray(value) && value.length) {
              query.andWhere(`${identifier} IN (:${identifier})`, {
                [identifier]: value,
              })
            } else if (value.min || value.max) {
              if (value.min)
                query.andWhere(`${identifier} >= :${identifier}_min`, {
                  [`${identifier}_min`]: value.min,
                })
              if (value.max)
                query.andWhere(`${identifier} <= :${identifier}_max`, {
                  [`${identifier}_max`]: value.max,
                })
            } else {
              if (typeof value === 'string' && value.toUpperCase() === 'NULL') {
                query.andWhere(`${identifier} IS NULL`)
              } else {
                query.andWhere(`${identifier} = :${identifier}`, {
                  [identifier]: value,
                })
              }
            }
          })
        })

        if (search) query = this.applySearch(primaryAlias, query, search)

        if (sorters) query = this.applySorters(primaryAlias, query, sorters)
      })
    return finalQuery
  }

  async getTableData(
    connection: Connection,
    { page, limit, ...queryParams }: IQuery,
    entityTarget,
    relations?: IRelation[]
  ): Promise<any> {
    const query = this.getQuery(
      queryParams,
      entityTarget,
      relations,
      connection
    )
    const [data, total] = await query
      .skip(limit ? (page - 1) * limit : null)
      .take(limit)
      .getManyAndCount()
    return { total, page, limit, lastPage: Math.ceil(total / limit), data }
  }

  async getTableDataMilestoneDb(
    { page, limit, ...queryParams }: IQuery,
    entityTarget,
    relations?: IRelation[]
  ): Promise<any> {
    const manager = getConnectionManager()
    const connection = manager.get('milestonedb_read')
    !connection.isConnected && connection.connect()

    return this.getTableData(
      connection,
      { page, limit, ...queryParams },
      entityTarget,
      relations
    )
  }



  applySorters<T>(primaryAlias: string, query: SelectQueryBuilder<T>, sorters) {
    const sortersParams = Array.prototype.concat(sorters)
    sortersParams.forEach((sorter: string) => {
      const direction = sorter.startsWith('-') ? 'DESC' : 'ASC'
      const field = direction === 'DESC' ? sorter.substr(1) : sorter

      const relationAndField = field.split('.')
      const alias =
        relationAndField[relationAndField.length - 2] ?? primaryAlias
      const column = relationAndField[relationAndField.length - 1]

      query.orderBy(`${alias}.${column}`, direction)
    })

    return query
  }

  applySearch<T>(primaryAlias: string, query: SelectQueryBuilder<T>, search) {
    const searchParams = Array.prototype
      .concat(search.fields)
      .map((f) => new Param(f, search.value, primaryAlias))
    const searchValue = `%${search.value}%`
    query.andWhere(
      new Brackets((qb) => {
        searchParams.forEach(({ identifier }) => {
          qb.orWhere(`${identifier} LIKE :${identifier}_search`, {
            [`${identifier}_search`]: searchValue,
          })
        })
      })
    )

    return query
  }

  applyPagination<T>(query: SelectQueryBuilder<T>, page, limit) {
    query.skip((page - 1) * limit).take(limit)

    return query
  }

  applyQueryParams<T>(
    primaryAlias: string,
    query: SelectQueryBuilder<T>,
    queryParams
  ) {
    const { search, sorters, page, limit } = queryParams

    if (search) {
      query = this.applySearch<T>(primaryAlias, query, search)
    }

    if (sorters) {
      query = this.applySorters<T>(primaryAlias, query, sorters)
    }

    if (page && limit) {
      query = this.applyPagination<T>(query, page, limit)
    }

    return query
  }
}
