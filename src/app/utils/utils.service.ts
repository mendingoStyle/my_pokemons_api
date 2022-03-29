import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class UtilsService {
  successMessages = {
    emailSent: 'Email enviado com sucesso',
    redefinePasswordEmailSent: 'Uma nova senha foi enviada para o seu e-mail',
    usersExists: 'Usuário existe',
    available: 'Disponível',
  }

  errorMessages = {
    mailNotSent: 'Não foi possível enviar o e-mail',
    notPendingRow: 'Este registro não está pendente',
    deletedRowFound: 'Este registro foi deletado',
    invalidCredentials: 'Usuário ou senha inválidos',
    incorrectAnswer: 'Resposta incorreta',
    expiredCaptcha: 'Captcha expirado',
    incorrectCaptchaResult: 'Reposta incorreta',
    nameAlreadyExists: 'Já possui um registro utilizando este nome',
    userAlreadyExists: 'Já possui um registro utilizando este user',
    cpfAlreadyExists: 'Já possui um registro utilizando este CPF',
    roleContainsUsers:
      'Não é permitido deletar pois possui usuários associados',
    deactivatedUser: 'Usuário desativado',
    dontHavePermission:
      'Acesso negado para este recurso. Certifique-se de ter permissão de acesso',
    notRegisteredUser: 'Usuário não cadastrado',
    operationNotAllowed: 'Operação não permitida',
    actionNotAllowed: 'Erro, ação não permitida',
    labelAlreadyExists: 'Já possui um registro utilizando essa label',
    codeAlreadyExists: 'Já possui um registro utilizando esse code',
    linkedValue: 'Este registro está vinculado a outros, ação não permitida!',
  }

  throwErrorBadReqException(...msg: string[]): void {
    throw new BadRequestException({
      statusCode: 400,
      message: [...msg],
      error: 'Bad Request',
    })
  }

  throwForbiddenException(...msg: string[]): void {
    throw new ForbiddenException({
      statusCode: 403,
      message: [msg],
      error: 'Forbidden',
    })
  }

  throwNotFoundException(...msg: string[]): void {
    throw new NotFoundException({
      statusCode: 404,
      message: msg,
      error: 'Not Found',
    })
  }

  throwValidateHttpException(
    msg: string[],
    validateObj: Record<string, unknown>
  ): void {
    throw new HttpException(
      {
        statusCode: 422,
        message: [...msg],
        error: 'Unprocessable Entity',
        context: validateObj,
      },
      422
    )
  }

  throwValidateWithObject(
    msg: string[],
    object: Record<string, unknown>
  ): void {
    throw new HttpException(
      {
        statusCode: 400,
        message: [...msg],
        error: 'Bad Request',
        context: object,
      },
      400
    )
  }
}
