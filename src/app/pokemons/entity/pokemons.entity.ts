import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'


@Entity('Pokemons')
export class Pokemons {
  @PrimaryGeneratedColumn()
  id: number

  @Column({})
  row: number

  @Column({})
  pokedex_number: number

  @Column({})
  img_name: number

  @Column({})
  generation: number

  @Column({})
  evolution_stage: number

  @Column({})
  evolved: number

  @Column({})
  familyId: number

  @Column({})
  cross_gen: number

  @Column({})
  type_1: string

  @Column({})
  type_2: string

  @Column({})
  weather_1: string

  @Column({})
  weather_2: string

  @Column({})
  status_total: number

  @Column({})
  atk: number

  @Column({})
  def: number

  @Column({})
  sta: number

  @Column()
  legendary: number

  @Column()
  aquireable: number

  @Column()
  spaws: number

  @Column()
  regional: number

  @Column()
  raidable: number

  @Column()
  hatchble: number

  @Column()
  shiny: number

  @Column()
  nest: number

  @Column()
  new: number

  @Column()
  not_gettable: number

  @Column()
  future_evolve: number

  @Column()
  max_cp_40: number

  @Column()
  max_cp_39: number

  @Column({})
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

}
