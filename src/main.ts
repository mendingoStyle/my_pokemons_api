/* eslint-disable import/first */
import { INestApplication, ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import * as path from 'path'
import { writeFileSync, readFileSync } from 'fs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config()

import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as fs from 'fs'

function generateSwaggerHtml(app: INestApplication) {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('pokemons')
    .setDescription('Rotas da aplicação do back-end')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  const readSwagger = readFileSync(
    path.resolve(process.cwd(), 'src', 'templates', 'swagger.template'),
    {
      encoding: 'utf8',
    }
  )

  const tempPath = path.resolve(process.cwd(), 'tmp')

  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath, { recursive: true })
  }

  writeFileSync(
    path.resolve(tempPath, 'swagger.html'),
    readSwagger.replace('$$spec', JSON.stringify(document)),
    {
      encoding: 'utf8',
    }
  )
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  generateSwaggerHtml(app)

  const { APP_PORT } = process.env
  await app.listen(APP_PORT,'0.0.0.0', () =>
    console.log(`🚀 SERVER IS ON AT ${APP_PORT}`)
  )
}

bootstrap()
