import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { UserDto } from './user.entity.dto'

export class CreateUserPayloadDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  password: string

  @IsString()
  @IsNotEmpty({ message: 'O campo user é obrigatório' })
  user: string

  @IsString()
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
  email: string

  @IsString()
  cpf?: string



}

export class CreateUserResultDto extends UserDto { }
