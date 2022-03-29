import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { RecoveryPasswordService } from './recoveryPassword.service'
import { UtilsModule } from '../utils/utils.module'
import { RecoveryPasswordController } from './recoveryPassword.controller'
import { ForgetPasswordModule } from 'app/forgetPassword/forgetPassword.module'
import { AuthModule } from 'app/auth/auth.module'


@Module({
  controllers: [RecoveryPasswordController],
  imports: [
    UsersModule,
    UtilsModule,
    ForgetPasswordModule,
    AuthModule,
  ],
  providers: [RecoveryPasswordService],
  exports: [RecoveryPasswordService],
})
export class RecoveryPasswordModule { }
