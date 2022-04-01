import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { ForgetPasswordService } from './forgetPassword.service'
import { UtilsModule } from '../utils/utils.module'
import { ForgetPasswordController } from './forgetPassword.controller'
import { AuthModule } from 'app/auth/auth.module'

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
