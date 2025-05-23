import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  validateOrReject,
} from 'class-validator';

export enum AccountType {
  CORRENTE = 'Corrente',
  POUPANCA = 'Poupança',
  CREDITO = 'Crédito',
  INVESTIMENTO = 'Investimento',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @Column({ type: 'enum', enum: AccountType })
  @IsEnum(AccountType, { message: 'Tipo de conta inválido.' })
  accountType: AccountType;

  @Column({ type: 'numeric', default: 0 })
  @IsNumber({}, { message: 'O saldo deve ser um número.' })
  @Min(0, { message: 'O saldo não pode ser negativo.' })
  @IsOptional()
  balance: number;

  @OneToMany(() => Transaction, (t) => t.originAccount)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts, {
    nullable: false,
  })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, {
      validationError: { target: false },
    });
  }
}
