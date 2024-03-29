import { MembershiType } from "@codernex/schema";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Membership {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ enum: MembershiType, default: MembershiType.free, type: "enum" })
  type: MembershiType;

  @Column({ default: 1 })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
