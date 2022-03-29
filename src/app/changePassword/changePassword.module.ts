import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { ChangePasswordService } from './changePassword.service'
import { UtilsModule } from '../utils/utils.module'
import { ChangePasswordController } from './changePassword.controller'
import { ForgetPasswordModule } from 'app/forgetPassword/forgetPassword.module'
import { AuthModule } from 'app/auth/auth.module'


@Module({
  controllers: [ChangePasswordController],
  imports: [
    UsersModule,
    UtilsModule,
    ForgetPasswordModule,
    AuthModule,
  ],
  providers: [ChangePasswordService],
  exports: [ChangePasswordService],
})
export class ChangePasswordModule { }
