import { IsNotEmpty, IsString } from 'class-validator'

export class ForgotPasswordPayloadDto {
  @IsNotEmpty()
  user: string

  @IsNotEmpty()
  email: string

  password?: string

  @IsString()
  token: string

}
