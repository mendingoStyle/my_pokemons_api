import { Test, TestingModule } from '@nestjs/testing'
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm'
import { Users } from '../../../src/app/users/entities/user.entity'
import { UsersService } from '../../../src/app/users/users.service'
import { QueryParamsService } from '../../../src/app/query-params/query-params.service'
import { UtilsService } from '../../../src/app/utils/utils.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { mockedUser, repositoryMockFactory } from '../../utils'
import { Connection } from 'typeorm'

describe('UsersService', () => {
  let service: UsersService
  let userRead
  let utilsService: UtilsService
  let connection
  let userWrite

  const mockConnection = () => ({
    transaction: jest.fn(),
    findOne: jest.fn(),
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    userRead = module.get<any>(getRepositoryToken(Users, 'pokemonsdb_read'))
    utilsService = module.get<UtilsService>(UtilsService)
    connection = module.get<Connection>(getConnectionToken('pokemonsdb_write'))
    userWrite = module.get<any>(getRepositoryToken(Users, 'pokemonsdb_write'))
  
  })

  describe('createUser', () => {
    it('should throw if email already exists', async () => {
      userRead.findOne = jest.fn(() => mockedUser)

      try {
        await service.create(mockedUser)

        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it('should pass if email doesnt exists', async () => {
      userRead.findOne = jest.fn()
      service.validateIfExists = jest.fn()
      const mockedManager = {
        save: jest.fn(() => mockedUser),
      }
      connection.transaction = (cb) => cb(mockedManager)

      const result = await service.create(mockedUser)

      expect(result).toBeDefined()
    })

    it('should call transaction', async () => {
      const mockedManager = {
        save: jest.fn(),
      }

      jest
        .spyOn(connection, 'transaction')
        .mockImplementation((cb: (...args) => any) => cb(mockedManager))


      service.validateIfExists = jest.fn()

      await service.create(mockedUser)

      expect(connection.transaction).toHaveBeenCalled()
    })
  })

  describe('getCredentials', () => {
    it('should throw if not found', async () => {
      jest.spyOn(userRead, 'findOne').mockImplementationOnce(() => undefined)

      try {
        await service.getCredentials(mockedUser)

        expect(true).toBe(false)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })

    it('should return if found', async () => {
      jest.spyOn(userRead, 'findOne').mockImplementationOnce(() => ({
        id: 1,
        password: mockedUser.password,
      }))

      const result = await service.getCredentials(mockedUser)

      expect(userRead.findOne).toHaveBeenCalled()
      expect(result.password).toBeDefined()
      expect(result.id).toBeDefined()
    })
  })

  describe('validateIfExists', () => {
    it('should throw if email already exists', async () => {
      userRead.findOne = jest.fn(() => mockedUser)

      try {
        await service.validateIfExists([
          {
            key: 'email',
            value: mockedUser.email,
            errorMessage: 'Email já cadastrado',
          },
        ])
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException)
      }
    })

    it('should pass if email doesnt exists', async () => {
      userRead.findOne = jest.fn()

      expect(
        await service.validateIfExists([
          {
            key: 'email',
            value: mockedUser.email,
            errorMessage: 'Email já cadastrado',
          },
        ])
      ).toBeUndefined()
    })
  })
})
