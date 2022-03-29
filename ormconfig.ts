
module.exports = {
  cli: 'src/migrations/pokemonsMigrations',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING === 'true' ?? false,
  port: Number(process.env.DB_PORT),
  entities: ['dist/**/*.entity.*{.ts,.js}'],
  migrations: ['dist/**/pokemonsMigration/*{.ts,.js}'],
  database: process.env.DB_DATABASE,
  keepConnectionAlive: true,
  synchronize: false,
  type: 'mysql',
  host: process.env.DB_WRITE_HOST,
}
