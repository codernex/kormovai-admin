import { string, z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  mobile: z.string(),
  email: z.string().optional(),
  password: z.string(),
  nid: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  referCode: z.string(),
  dob: z.date(),
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
