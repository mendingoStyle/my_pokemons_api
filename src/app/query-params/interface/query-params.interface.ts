import { PaginationPayloadDto } from '../../pokemons/dto/pagination.dto'

export interface IRelation {
  target: string
  relation: string
  join?: 'left' | 'inner'
}

export interface IQuery extends PaginationPayloadDto {
  // [x: string]: any
}
