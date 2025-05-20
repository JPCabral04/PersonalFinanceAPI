import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accountType: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.originAccount)
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}
