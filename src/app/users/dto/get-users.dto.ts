import {
  PaginationPayloadDto,
  PaginationResultDto,
} from '../../pokemons/dto/pagination.dto'
import { UserDto } from './user.entity.dto'

export class GetUsersPayloadDto extends PaginationPayloadDto { }

class UserResult extends UserDto {
  roles: UserDto[]
}

export class GetUsersResultDto extends PaginationResultDto {
  data: UserResult[]
}
