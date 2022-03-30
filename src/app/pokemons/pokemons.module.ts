import { forwardRef, Module } from '@nestjs/common'
import { PokemonsService } from './pokemons.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsModule } from '../utils/utils.module'
import { PokemonsController } from './pokemons.controller'
import { Pokemons } from './entity/pokemons.entity'
import { QueryParamsModule } from '../query-params/query-params.module'

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [
    TypeOrmModule.forFeature([Pokemons], 'pokemonsdb_read'),
    TypeOrmModule.forFeature([Pokemons], 'pokemonsdb_write'),
    forwardRef(() => UtilsModule),
    QueryParamsModule
  ],
  exports: [PokemonsService],
})
export class PokemonsModule { }
