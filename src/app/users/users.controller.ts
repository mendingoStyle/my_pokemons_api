import {
  Controller,
  Get,
  Param,
  UseGuards,

} from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { UserDto } from './dto/user.entity.dto'

@ApiTags('Usuários')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findOneWithPermissions(id)
  }




}
