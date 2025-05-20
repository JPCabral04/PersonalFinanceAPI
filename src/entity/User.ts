import { IsEmail, IsNotEmpty, MinLength, IsDate } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column()
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  // @OneToMany(() => Account, account => account.user)
  // accounts: Account[];
}
