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
} from "typeorm";
import { UserRole } from "@codernex/types";
import { Membership } from "./membership";
import { Account } from "./account";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  email?: string;
  @Column()
  occupation: string;

  @Column({ type: "varchar" })
  mobile: string;

  @Column({ select: false })
  password: string;

  @Column()
  nid: string;

  @Column()
  dob: Date;

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

  @OneToOne(() => Membership, (m) => m.user)
  @JoinColumn()
  membership: Membership;

  @OneToOne(() => Account, (acc) => acc.user)
  @JoinColumn()
  account: Account;

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
