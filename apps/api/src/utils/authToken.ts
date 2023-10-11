import sanitizedConfig from "config";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";
import { IApiResponse } from "@codernex/types";
import { Admin, User } from "@/models";

export const sendToken = (
  res: Response<IApiResponse<unknown>>,
  user: User | Admin,
  next: NextFunction
) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    sanitizedConfig.JWT_SECRET,
    {
      expiresIn: 1000 * 60 * 60,
    }
  );

  if (!token) {
    return ApiError(
      "Please Login Again There are some unexpected error",
      404,
      next
    );
  }

  const { password, ...userWithoutPass } = user;

  res
    .cookie("token", token, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 365,
    })
    .status(200)
    .json({
      data: {
        user: userWithoutPass,
        accessToken: token,
      },
    });
};
