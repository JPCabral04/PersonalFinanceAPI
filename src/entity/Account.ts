import {
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
} from 'class-validator';

export enum AccountType {
  CREDITO = 'crédito',
  DEBITO = 'débito',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsEnum(AccountType)
  accountType: AccountType;

  @Column({ type: 'numeric', default: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.originAccount, {
    cascade: true,
    nullable: true,
  })
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
