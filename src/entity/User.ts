import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  validateOrReject,
} from 'class-validator';
import { Account } from './Account';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @Column({ unique: true })
  @IsEmail(undefined, { message: 'Email inválido' })
  email: string;

  @Column()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password_hash: string;

  @OneToMany(() => Account, (account) => account.user, {
    cascade: ['remove'],
  })
  accounts: Account[];

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, { validationError: { target: false } });
  }
}
