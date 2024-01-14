import sanitizedConfig from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { Admin, User } from "@/models";

export const sendToken = (
  res: Response,
  user: User | Admin,
  next: NextFunction
) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    sanitizedConfig.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 365,
    }
  );

  if (!token) {
    return ApiError(
      "Please Login Again There are some unexpected error",
      404,
      next
    );
  }

  res.status(200).json({
    user,
    accessToken: token,
  });
};
