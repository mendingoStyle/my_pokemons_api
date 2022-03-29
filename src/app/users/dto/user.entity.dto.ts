import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator'

export class UserDto {
  @IsOptional()
  @IsPositive()
  id: number

  @IsNotEmpty()
  user: string

  @IsNotEmpty()
  email: string

  name?: string
  
  @IsOptional()
  cpf?: string

  @IsOptional()
  password?: string

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date
}


