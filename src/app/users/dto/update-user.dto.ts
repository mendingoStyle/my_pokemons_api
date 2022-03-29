import { PartialType } from '@nestjs/swagger'
import { IsPositive, IsString } from 'class-validator'
import { CreateUserPayloadDto } from './create-user.dto'

export class UpdateUserPayloadDto extends PartialType(CreateUserPayloadDto) {
  @IsString()
  user?: string

  @IsString()
  password?: string
}

export class UpdateUserResultDto { }
