import { IUser } from "@codernex/types";
import { UserController } from "controller/user";

export * from "./error";

export function generateRandomString(length: number): string {
  const characters = "0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export async function addJoiningBonus(
  amount: number,
  user: IUser,
  depth: number
) {
  const userArr = [];
  let currentUser: IUser | null = user;
  for (let i = 0; i < depth; i++) {
    currentUser = await new UserController().findUserById(user.referrer.id);
    if (currentUser) userArr.push(currentUser);
  }

  // Update every user account
}
