import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserRole } from "@codernex/types";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  username: string;
  @Column()
  name: string;

  @Column()
  password: string;
  @Column()
  email: string;
  @Column({ enum: UserRole, type: "enum", default: UserRole.admin })
  role: UserRole;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
