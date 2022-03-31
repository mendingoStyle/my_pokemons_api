import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'

import { AppModule } from '../../../src/app.module'
jest.setTimeout(25000)

describe('Auth', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await NestFactory.create(AppModule)
    app.enableCors()
    app.use(json({ limit: '50mb' }))

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    const APP_PORT = 3333
    await app.listen(APP_PORT, () =>
      console.log(`🚀 SERVER IS ON AT ${APP_PORT}`)
    )
  })

  it('test', () => expect(true).toBeTruthy())
})
