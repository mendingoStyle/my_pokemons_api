import 'dotenv/config'

import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'

describe('App', () => {
  let config: ConfigService
  const envs = [
    'APP_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_LOGGING',
    'DB_PORT',
    'DB_DATABASE',
    'DB_READ_HOST',
    'DB_WRITE_HOST',
    'SECRET_KEY',
    'TOKEN_EXPIRE_TIME',
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [ConfigService],
    }).compile()

    config = module.get<ConfigService>(ConfigService)
  })

  describe('envs', () => {
    it('should have all envs set', async () => {
      for (const env of envs) {
        expect(config.get(env).length > 0).toBeTruthy()
      }
    })
  })
})
