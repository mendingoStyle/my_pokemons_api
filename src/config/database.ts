import dotenv from 'dotenv'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'


const pokemonsdbOptions: MysqlConnectionOptions = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING === 'true' ?? false,
  port: Number(process.env.DB_PORT),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/pokemonsMigrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations/pokemonsMigrations',
  },
  database: process.env.DB_DATABASE,
  synchronize: false,
  type: 'mysql',
}


export const pokemonsdb = {
  ...pokemonsdbOptions,
  host: process.env.DB_WRITE_HOST,
}
