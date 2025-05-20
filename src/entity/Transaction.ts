import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';

export enum TransactionType {
  DEBIT = 'Débito',
  CREDIT = 'Crédito',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  transactionType: TransactionType;

  @ManyToOne(() => Account)
  originAccount: Account;

  @ManyToOne(() => Account)
  destinationAccount: Account;

  @Column({ type: 'numeric' })
  transactionValue: number;

  @Column({ default: '' })
  description: string;

  @CreateDateColumn()
  transactionDate: Date;
}
