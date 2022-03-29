import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UtilsService } from '../utils/utils.service'
import { LoginPayloadDto, LoginResultDto } from './dto/login.dto'
import { ForgetPasswordPayloadDto } from 'app/forgetPassword/dto/forgetPassword.dto'
import { ChangePasswordDTO } from 'app/changePassword/dto/forgetPassword.dto'


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private utils: UtilsService
  ) { }

  async validateUser(user: string, pass: string): Promise<any> {
    const userExists = await this.usersService.getCredentials({ user })

    if (!(await bcrypt.compare(pass, userExists.password))) {
      this.utils.throwErrorBadReqException(
        this.utils.errorMessages.invalidCredentials
      )
    }

    return true
  }

  async login(user: LoginPayloadDto): Promise<LoginResultDto> {
    const userExists = await this.usersService.getCredentials({
      user: user.user,
    })

    if (!(await bcrypt.compare(user.password, userExists.password))) {
      this.utils.throwErrorBadReqException(
        this.utils.errorMessages.invalidCredentials
      )
    }

    return {
      accessToken: this.jwtService.sign(
        {
          id: userExists.id,
          user: user.user,
          sub: userExists.id,
        },
        { secret: process.env.SECRET_KEY }
      ),
    }
  }


  async checkUser(user: { username: string }) {
    await this.usersService.findOne(user)
    return {
      statusCode: 200,
      message: [this.utils.successMessages.usersExists],
    }
  }
  async verifyToken(token: string): Promise<number> {
    try {
      const decodedToken = this.jwtService.verify(token)
      return decodedToken.sub
    } catch (error) {
      this.utils.throwForbiddenException(
        'Não autorizado'
      )
    }
  }
  async createTokenChangePassword(user: ForgetPasswordPayloadDto) {
    const acessToken = {
      accessToken: this.jwtService.sign(
        {
          email: user.email,
          user: user.user,
          sub: user.id,
        },
        { secret: process.env.SECRET_KEY_FORGET_PASSWORD }
      ),
    }
    return acessToken
  }
  async changePassword(user: ChangePasswordDTO): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(user.acessToken)
      const userExists = await this.usersService.getCredentials({
        user: decodedToken.user,
      })
      if (!(await bcrypt.compare(user.password, userExists.password))) {
        this.utils.throwErrorBadReqException(
          this.utils.errorMessages.invalidCredentials
        )
      }
      const result = await this.usersService.update(userExists.id, user.newPassword)
      if(result) return { message: 'Senha Atualizada com sucesso' }
      else return result

    } catch (error) {
      this.utils.throwForbiddenException(
        'Não autorizado' + error
      )
    }
  }

}
