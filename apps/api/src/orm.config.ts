import sanitizedConfig from "config";
import { DataSource } from "typeorm";
import { Account, Admin, Deposit, Membership, Payment, User } from "@/models";

export const appDataSource = new DataSource({
  type: "mysql",
  database: sanitizedConfig.DB_NAME,
  username: sanitizedConfig.DB_USER,
  password: sanitizedConfig.DB_PASS,
  entities: [User, Admin, Membership, Account, Payment, Deposit],
  host: "localhost",
  port: 3306,
  logging: false,
  synchronize: true,
});
