import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  pendingBalance: number;

  @Column({ default: 0 })
  totalWithdraw: number;

  @Column({ default: 0 })
  pendingWithdraw: 0;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
