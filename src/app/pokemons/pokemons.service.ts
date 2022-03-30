import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectConnection, InjectRepository } from '@nestjs/typeorm'
import { UtilsService } from '../utils/utils.service'
import { Connection, Repository, FindOneOptions } from 'typeorm'
import { Pokemons } from './entity/pokemons.entity'
import { GetPokemonsResultDto } from './dto/get-pokemons.dto'
import { QueryParamsService } from '../query-params/query-params.service'
import { PokemonsDto } from './dto/pokemons.dto'


@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemons, 'pokemonsdb_write')
    private readonly pokemonWrite: Repository<Pokemons>,
    @InjectRepository(Pokemons, 'pokemonsdb_read')
    private readonly pokemonRead: Repository<Pokemons>,
    @InjectConnection('pokemonsdb_write') private connection: Connection,
    private utils: UtilsService,
    private queryParamsService: QueryParamsService,

  ) { }
  async create(
    pokemon: PokemonsDto
  ): Promise<Pokemons> {
    return await this.pokemonWrite.save(pokemon)

  }


  async findOne(
    query: any,
    options?: FindOneOptions,
  ): Promise<Pokemons> {
    const pokemons = await this.pokemonRead.findOne(query, options)
    if (!pokemons)
      this.utils.throwNotFoundException(
        'pokemon não encontrado'
      )

    return pokemons
  }

  async findAll(
    params
  ): Promise<GetPokemonsResultDto> {
    const pokemons = await this.queryParamsService.getTableDataPokemonDb(params, Pokemons)
    if (!pokemons.data || pokemons.data.length <= 0)
      this.utils.throwNotFoundException(
        'Pokemons não encontrados'
      )
    return pokemons
  }
}