import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  mobile: z.string(),
  email: z.string().optional(),
  password: z.string(),
  nid: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  referCode: z.string().optional(),
  dob: z.string(),
  occuption: z.string(),
});

export const adminLoginSchema = z.object({
  usernameOrEmail: z.string().min(4),
  password: z.string().min(6),
});

export const userLoginSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export const createAdminSchema = z.object({
  email: z.string(),
  username: z.string().min(4),
  name: z.string(),
  password: z.string().min(6),
  secret: z.string(),
});

export const createPaymentSchema =
  z.object({
    method: z.string(),
    accountHolder: z.string().optional(),
    accountNumber: z.string(),
    accountType: z.string().optional(),
    bank: z.string().optional(),
    amount: z.string(),
  }) ||
  z.object({
    method: z.string(),
    accountNumber: z.string(),
    accountType: z.string(),
    amount: z.string(),
  });

export enum MembershiType {
  "free" = "free",
  "premium" = "premium",
}
export const createMembershipSchema = z.object({
  name: z.string(),
  amount: z.number().optional(),
  duration: z.string(),
  type: z.nativeEnum(MembershiType),
});

export const updateMembershipSchema = z.object({
  name: z.string().optional(),
  amount: z.number().optional(),
});
