import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "@codernex/types";
import { Membership } from "./membership";
import { Account } from "./account";
import { Deposit } from "./deposit";
import { Payment } from "./payment";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email?: string;
  @Column()
  occupation: string;

  @Column({ type: "varchar" })
  mobile: string;

  @Column()
  password: string;

  @Column()
  nid: string;

  @Column()
  dob: string;

  @Column()
  fatherName: string;

  @Column()
  motherName: string;

  @Column({ enum: UserRole, type: "enum", default: UserRole.user })
  role: UserRole;

  // Define the self-referencing relationship
  @ManyToMany((type) => User, (user) => user.referrals)
  @JoinTable()
  referrals: User[];

  // If you want to track the referrer for each user
  @ManyToOne((type) => User, (user) => user.referrals)
  referrer: User;

  @Column({ default: 1 })
  level: number;

  @OneToOne(() => Membership)
  @JoinColumn()
  membership: Membership;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;
  // Deposit
  @OneToMany(() => Deposit, (d) => d.user, { cascade: true })
  deposits: Deposit[];

  // Payments

  @OneToMany(() => Payment, (p) => p.user, { cascade: true })
  payments: Payment[];

  @Column({ nullable: true })
  membershipRenewalData: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  addReferral(user: User) {
    if (this.referrals == null) {
      this.referrals = new Array<User>();
    }
    this.referrals.push(user);
  }
}
