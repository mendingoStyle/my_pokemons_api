import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { pokemonsdb } from './config/database'
import { AppController } from './app.controller'
import { QueryParamsModule } from 'app/query-params/query-params.module'
import { AuthModule } from 'app/auth/auth.module'
import { UtilsModule } from 'app/utils/utils.module'
import { PokemonsModule } from 'app/pokemons/pokemons.module'
import { UploadModule } from 'app/upload/upload.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...pokemonsdb,
      host: process.env.DB_READ_HOST,
      name: 'pokemonsdb_read',
    }),
    TypeOrmModule.forRoot({
      ...pokemonsdb,
      host: process.env.DB_WRITE_HOST,
      name: 'pokemonsdb_write',
    }),
    PokemonsModule,
    AuthModule,
    UtilsModule,
    QueryParamsModule,
    UploadModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
