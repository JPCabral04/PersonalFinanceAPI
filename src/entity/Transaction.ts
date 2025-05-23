import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Account } from './Account';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  validateOrReject,
} from 'class-validator';

export enum TransactionType {
  DEBIT = 'Débito', // débito = valor sai de originAccount
  CREDIT = 'Crédito', // crédito = valor entra em destinationAccount
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  @IsEnum(TransactionType, {
    message: 'Tipo de transação inválido.',
  })
  transactionType: TransactionType;

  @ManyToOne(() => Account, {
    nullable: false,
    onDelete: 'RESTRICT', // não deixa apagar conta com débitos
  })
  originAccount: Account;

  @ManyToOne(() => Account, {
    nullable: true,
    onDelete: 'SET NULL', // se conta destino for apagada, fica null a FK da conta, mas não apaga a transação
  })
  destinationAccount: Account;

  @Column({ type: 'numeric' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor da transação deve ser maior que zero.' })
  transactionValue: number;

  @Column({ default: '' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsOptional()
  description: string;

  @CreateDateColumn()
  transactionDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this, {
      validationError: { target: false },
    });
  }
}
