import { Injectable } from '@nestjs/common'
import { UsersService } from 'app/users/users.service';
import { UtilsService } from 'app/utils/utils.service';
import { UserChangePasswordDTO } from './dto/forgetPassword.dto';
import { AuthService } from 'app/auth/auth.service';


@Injectable()
export class RecoveryPasswordService {
  constructor(
    private utils: UtilsService,
    private readonly authPassword: AuthService,
    private readonly userService: UsersService

  ) { }
  async changePassword(user: UserChangePasswordDTO) {
    if (user.password !== user.confirmPassword) {
      this.utils.throwForbiddenException(
        'Campo password e Campo confirmPassword Diferentes'
      )
    }
    const id = await this.authPassword.verifyToken(user.acessToken)
    if (id > 0) {
      const update = await this.userService.update(id, user.password)
      if (update.id) return { message: "Senha atualizada com sucesso" }
    }
    return { message: "Não foi possível atualizar a senha" }
  }

}
