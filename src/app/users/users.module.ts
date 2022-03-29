import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './entities/user.entity'
import { UtilsModule } from '../utils/utils.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([Users], 'pokemonsdb_read'),
    TypeOrmModule.forFeature([Users], 'pokemonsdb_write'),
    UtilsModule,
  ],
  exports: [UsersService],
})
export class UsersModule { }
