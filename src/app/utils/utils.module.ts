import {forwardRef, Module } from '@nestjs/common';
import { PokemonsModule } from 'app/pokemons/pokemons.module';
import { FileReaderPokemons } from './file.reader';
import { FormatterService } from './formatter.service';
import { UtilsService } from './utils.service';




@Module({
  imports: [forwardRef(() => PokemonsModule)],
  providers: [
    UtilsService,
    FileReaderPokemons,
    FormatterService
  ],
  exports: [UtilsService, FileReaderPokemons,FormatterService],
})
export class UtilsModule { }
