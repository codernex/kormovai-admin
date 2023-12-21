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
export class Deposit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  amount: number;

  @Column()
  mobile: string;

  @Column()
  trxId: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column({ type: "date" })
  @ManyToOne(() => User, (user) => user.deposits)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
