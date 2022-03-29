import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectConnection, InjectRepository } from '@nestjs/typeorm'
import { UtilsService } from '../utils/utils.service'
import { Connection, Repository, FindOneOptions } from 'typeorm'
import { Users } from './entities/user.entity'
import { IUserValidateExists } from './interface/user.interface'
import { UserDto } from './dto/user.entity.dto'
import { CreateUserResultDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users, 'pokemonsdb_write')
    private readonly userWrite: Repository<Users>,
    @InjectRepository(Users, 'pokemonsdb_read')
    private readonly userRead: Repository<Users>,
    @InjectConnection('pokemonsdb_write') private connection: Connection,
    private utils: UtilsService
  ) { }

  async findOne(query: any, options?: FindOneOptions): Promise<Users> {
    const allOptions: FindOneOptions = {
      withDeleted: true,
      ...options,
    }
    const user = await this.userRead.findOne(query, allOptions)

    if (!user)
      this.utils.throwNotFoundException(
        this.utils.errorMessages.notRegisteredUser
      )
    if (user.deletedAt)
      this.utils.throwErrorBadReqException(
        this.utils.errorMessages.deletedRowFound
      )

    return user
  }

  async findOneWithPermissions(id: any): Promise<UserDto> {
    const user = await this.findOne({ id })
    return { ...user }
  }


  async getCredentials(user) {
    const credentials = await this.userRead.findOne({
      select: ['id', 'password'],
      where: { user: user.user },
    })
    if (!credentials)
      this.utils.throwNotFoundException(
        this.utils.errorMessages.invalidCredentials
      )
    return credentials
  }

  async validateIfExists(
    validateObjects: IUserValidateExists[],
  ): Promise<Users> {
    for (const validate of validateObjects) {
      const { key, value, errorMessage } = validate
      const user = await this.userRead.findOne({
        where: { [key]: value },
      })
      if (user) this.utils.throwErrorBadReqException(errorMessage)
      else return user
    }
  }
  async validateIfNotExists(
    validateObjects: IUserValidateExists[],
  ): Promise<Users> {
    for (const validate of validateObjects) {
      const { key, value, errorMessage } = validate
      const user = await this.userRead.findOne({
        where: { [key]: value },
      })
      if (!user) this.utils.throwErrorBadReqException(errorMessage)
      else return user
    }
  }

  async create(
    user: CreateUserResultDto
  ): Promise<CreateUserResultDto> {
    const hashedPassword = await bcrypt.hash(user.password, 12)
    user.password = hashedPassword
    const validate = [{
      key: 'email', value: user.email, errorMessage: 'email já cadastrado'
    }, {
      key: 'user', value: user.user, errorMessage: 'usuario já cadastrado'
    }]
    await this.validateIfExists(validate)
    const userSave = await this.userWrite.save(user)
    return userSave

  }
  async update(id: number, password: string) {
    const user = await this.findOne({ id })
    const hashedPassword = await bcrypt.hash(password, 12)
    return this.userWrite.save({ ...user, password: hashedPassword })
  }
}
