import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { CreateUserResultDto } from 'app/users/dto/create-user.dto'
import { UsersService } from 'app/users/users.service'

@Controller('createUser')
export class AuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  createUser(
    @Body(new ValidationPipe()) user: CreateUserResultDto) {
    return this.usersService.create(user)
  }
}