import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { ForgetPasswordService } from './forgetPassword.service'
import { UtilsModule } from '../utils/utils.module'
import { ForgetPasswordController } from './forgetPassword.controller'
import { AuthModule } from 'app/auth/auth.module'
import { AuthService } from 'app/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [ForgetPasswordController],
  imports: [
    UsersModule,
    PassportModule,
    UtilsModule,
    AuthModule,

  ],
  providers: [ForgetPasswordService, ForgetPasswordService],
  exports: [ForgetPasswordService],
})
export class ForgetPasswordModule { }
