import { Injectable } from '@nestjs/common'
import { UsersService } from 'app/users/users.service';
import { UtilsService } from 'app/utils/utils.service';
import { ChangePasswordDTO } from './dto/forgetPassword.dto';
import { AuthService } from 'app/auth/auth.service';


@Injectable()
export class ChangePasswordService {
  constructor(
    private utils: UtilsService,
    private readonly authPassword: AuthService,
    private readonly userService: UsersService

  ) { }

  async changePassword(user: ChangePasswordDTO): Promise<any> {
    if (user.newPassword !== user.confirmNewPassword) {
      this.utils.throwErrorBadReqException(
        'Os Campos senha e confirmar nova senha não correspodem'
      )
    }
    return await this.authPassword.changePassword(user)
  }
}
