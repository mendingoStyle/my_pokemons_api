import {
  PaginationPayloadDto,
  PaginationResultDto,
} from './pagination.dto'
import { Pokemons } from '../entity/pokemons.entity'

export class GetPokemonsPayloadDto extends PaginationPayloadDto { }

export class GetPokemonsResultDto extends PaginationResultDto {
  data: Pokemons[]
}
