import { Module } from '@nestjs/common'
import { QueryParamsService } from './query-params.service'

@Module({
  providers: [QueryParamsService],
  exports: [QueryParamsService],
})
export class QueryParamsModule {}
