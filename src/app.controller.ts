import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common'
import { AuthService } from './app/auth/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginPayloadDto, LoginResultDto } from './app/auth/dto/login.dto'

import * as path from 'path'

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) {}

  @Get()
  index() {
    return {
      status: 'UP',
      checks: [],
    }
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginPayloadDto): Promise<LoginResultDto> {
    return this.authService.login(loginDto)
  }

}
