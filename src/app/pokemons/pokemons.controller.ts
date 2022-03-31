import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { Pokemons } from './entity/pokemons.entity'
import { GetPokemonsResultDto } from './dto/get-pokemons.dto'
import { PokemonsService } from './pokemons.service'


@ApiTags('Pokemons')
@UseGuards(JwtAuthGuard)
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) { }


  @Get()
  find(
    @Query() params: { id?: number }
  ): Promise<Pokemons | GetPokemonsResultDto> {
    const { id } = params
    if (id) {
      return this.pokemonsService.findOne(params)
    } else
      return this.pokemonsService.findAll(params)
  }




}
