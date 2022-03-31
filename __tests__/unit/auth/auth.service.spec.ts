import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../src/app/users/entities/user.entity'
import { UsersService } from '../../../src/app/users/users.service'
import { QueryParamsService } from '../../../src/app/query-params/query-params.service'
import { UtilsService } from '../../../src/app/utils/utils.service'
import { mockedUser, repositoryMockFactory } from '../../utils'
import { AuthService } from '../../../src/app/auth/auth.service'
import { LocalStrategy } from '../../../src/app/auth/local.strategy'
import { JwtStrategy } from '../../../src/app/auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'
import { isJWT } from 'class-validator'

describe('AuthService', () => {
  let service: AuthService
  let usersService: UsersService
  const mockConnection = () => ({
    transaction: jest.fn(),
    findOne: jest.fn(),
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async (config: ConfigService) => ({
            secret: config.get('SECRET_KEY'),
            signOptions: { expiresIn: config.get('TOKEN_EXPIRE_TIME') },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        ConfigService,
        UsersService,
        QueryParamsService,
        UtilsService,
        {
          provide: getConnectionToken('pokemonsdb_write'),
          useFactory: mockConnection,
        },
        {
          provide: getConnectionToken('pokemonsdb_read'),
          useFactory: mockConnection,
        },
        {
          provide: getRepositoryToken(Users, 'pokemonsdb_read'),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Users, 'pokemonsdb_write'),
          useFactory: repositoryMockFactory,
        },

        AuthService,
        LocalStrategy,
        JwtStrategy,
       
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
  })

  describe('validateUser', () => {
    it('should throw BadRequestException if password doesnt match', async () => {
      jest.spyOn(usersService, 'getCredentials').mockResolvedValue(mockedUser)

      try {
        await service.validateUser(mockedUser.email, 'qweasd')

        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it('should return true if password match', async () => {
      jest.spyOn(usersService, 'getCredentials').mockResolvedValue(mockedUser)

      const result = await service.validateUser(mockedUser.email, '1234')

      expect(result).toBeTruthy()
    })
  })

  describe('login', () => {
    it('should throw BadRequestException if invalid credentials', async () => {
      jest.spyOn(usersService, 'getCredentials').mockResolvedValue(mockedUser)

      try {
        await service.login({ user: mockedUser.user, password: 'qweasd' })

        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it('should resolve successfully', async () => {
      jest.spyOn(usersService, 'getCredentials').mockResolvedValue(mockedUser)
      jest.spyOn(usersService, 'findOneWithPermissions').mockResolvedValue({
        ...mockedUser,
      })

      const result = await service.login({
        user: mockedUser.user,
        password: '1234',
      })

      expect(Object.keys(result).length).toBe(1)
      expect(result.accessToken).toBeDefined()
      expect(typeof result.accessToken).toBe('string')
      expect(isJWT(result.accessToken)).toBeTruthy()
    })
  })
})
