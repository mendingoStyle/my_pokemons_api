import { IsNotEmpty, IsString } from 'class-validator'
export class ChangePasswordDTO {

  @IsString()
  @IsNotEmpty({ message: 'Campo password não pode ser vázia' })
  password: string

  @IsString()
  @IsNotEmpty({ message: 'Campo newPassword não pode ser vázia' })
  newPassword: string

  @IsString()
  @IsNotEmpty({ message: 'Campo confirmNewPassword não pode estar vazio' })
  confirmNewPassword: string

  @IsString()
  @IsNotEmpty({ message: 'Campo Token não pode ser vazio' })
  acessToken: string


}

