import { IsPositive } from 'class-validator'

export class DeleteMultipleDto {
  @IsPositive({ each: true })
  ids: number[]
}
