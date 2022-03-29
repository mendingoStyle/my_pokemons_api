import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginPayloadDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo user não pode ser vazio' })
  user: string

  @IsString()
  @IsNotEmpty({ message: 'O campo senha não pode ser vazio' })
  password: string
}

export class LoginResultDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}
