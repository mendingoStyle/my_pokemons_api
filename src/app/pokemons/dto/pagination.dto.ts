import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsPositive, IsOptional } from 'class-validator'
import { applyDecorators } from '@nestjs/common'

export const OpenApiPaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          totalPages: {
            type: 'number',
          },
          currentPage: {
            type: 'number',
          },
          itemsPerPage: {
            type: 'number',
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    })
  )
}

export class PaginationPayloadDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1
}

export class PaginationResultDto extends PaginationPayloadDto {
  @Type(() => Number)
  total: number

  @Type(() => Number)
  lastPage: number
}
