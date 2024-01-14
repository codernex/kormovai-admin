import {
  User,
  Payment,
  Deposit,
  Membership as Member,
} from "../../../apps/api/src/models";

export type HttpStatusCode = 200 | 201 | 203 | 404 | 401 | 403 | 500;

export interface IApiError {
  message: string;
  statusCode: HttpStatusCode | number;
}

export interface IApiResponse<T> {
  data?: T extends IApiError ? never : T;
  error?: T extends IApiError ? T : never;
}

export interface Ipayment extends Payment {}

export interface IUser extends User {}
export interface IDeposit extends Deposit {}
export interface IMembership extends Member {}

export enum UserRole {
  admin = "admin",
  user = "user",
  agent = "agent",
}
