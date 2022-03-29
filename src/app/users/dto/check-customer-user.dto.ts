import { IsString, Length } from 'class-validator'

export class CheckCustomerUserDto {
  @IsString()
  user: string
}
