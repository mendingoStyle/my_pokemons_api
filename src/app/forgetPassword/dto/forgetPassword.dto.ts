import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class ForgetPasswordPayloadDto {
  @IsString()
  @IsOptional()
  user?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsEmail()
  @IsOptional()
  id?: number
}
export class ForgetResultDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}
