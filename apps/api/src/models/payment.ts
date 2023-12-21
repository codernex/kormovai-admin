import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  method: string;

  @Column()
  accountHolder: string;

  @Column()
  accountNumber: string;

  @Column()
  accountType?: string;

  @Column({ nullable: true })
  bank?: string;

  @Column({ default: "pending" })
  status: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.payments, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
