import { IsOptional, IsPositive } from "class-validator";

export class PokemonsDto {
  @IsOptional()
  @IsPositive()
  id?: number

  row: number

  img_name: number
  
  pokedex_number: number

  generation: number

  evolution_stage: number

  evolved: number

  familyId: number

  cross_gen: number

  type_1: string

  type_2: string

  weather_1: string

  weather_2: string

  status_total: number

  atk: number

  def: number

  sta: number

  legendary: number

  aquireable: number

  spaws: number

  regional: number

  raidable: number

  hatchble: number

  shiny: number

  nest: number

  new: number

  not_gettable: number

  future_evolve: number

  max_cp_40: number

  max_cp_39: number

  name: string

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date
}