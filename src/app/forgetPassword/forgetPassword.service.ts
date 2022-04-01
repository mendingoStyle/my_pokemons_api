import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { UtilsService } from '../utils/utils.service'
import { ForgetPasswordPayloadDto } from './dto/forgetPassword.dto'
import { createTransport } from 'nodemailer'
import { ConfigService } from '@nestjs/config'
import { AuthService } from 'app/auth/auth.service'


@Injectable()
export class ForgetPasswordService {
  constructor(
    private readonly usersService: UsersService,
    private utils: UtilsService,
    private config: ConfigService,
    private readonly auth: AuthService
  ) { }
  async sendEmail(user: ForgetPasswordPayloadDto): Promise<any> {
    let userExists;
    if (user.user) {
      userExists = await this.usersService.validateIfNotExists([{
        key: 'user', value: user.user, errorMessage: 'Usuario nao encontrado'
      }])
    } else if (user.email) {
      userExists = await this.usersService.validateIfNotExists([{
        key: 'email', value: user.email, errorMessage: 'Usuario nao encontrado'
      }])
    }
    const acessToken = await this.auth.createTokenChangePassword(userExists)
    const url = 'https://' + this.config.get('FRONT_URL') + 'recoveryPassword/' + acessToken.accessToken
    const transporter = await createTransport({
      host: this.config.get('HOST_EMAIL'),
      port: user.email,
      secure: false,
      auth: {
        user: this.config.get('EMAIL'),
        pass: this.config.get('PASSWORD_EMAIL')
      },

    });



    const mailOptions = {
      from: this.config.get('EMAIL'),
      to: userExists.email,
      subject: 'Recovery Password POKEMON SYSTEM',
      html: '<a href="' + url + '">' + url + '</a>'
    };

    const promise = new Promise(async (resolve, reject) => {
      return await transporter.sendMail(mailOptions,
        async function (error, info) {
          if (error) {
            console.log(error)
            resolve({ message: 'Erro ao enviar o email' });
          } else {
            resolve({ message: 'Email enviado ao remetente' });
          }
        }
      );
    })
    return promise
  }



}
