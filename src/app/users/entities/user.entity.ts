import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  user: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ select: false })
  password: string

  @Column({})
  cpf?: string

  @Column({})
  name?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

}
