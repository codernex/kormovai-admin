import { requestHandler } from "helper";
import { IApiError, IApiResponse } from "@codernex/types";
import { ApiError } from "@/utils";
import { UserController } from "@/controller";
import sanitizedConfig from "../config";
import jwt from "jsonwebtoken";
import { AdminController } from "../controller/admin";

export const isAuthenticated = requestHandler<
  unknown,
  unknown,
  unknown,
  IApiResponse<IApiError | unknown>
>(async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    const userController = new UserController();
    const adminController = new AdminController();

    if (!token && !token.length) {
      return ApiError("No valid token found", 404, next);
    }

    const decodedData = jwt.verify(
      token,
      sanitizedConfig.JWT_SECRET
    ) as jwt.JwtPayload;

    console.log(decodedData);

    req.admin = await adminController.findById(decodedData.id);
    req.user = await userController.findUserById(decodedData.id);

    if (!req.admin && !req.user) {
      return ApiError("Don't have an user to go forward", 404, next);
    }
    next();
  } catch (err: any) {
    console.log(err);

    return ApiError(err.message, 404, next);
  }
});

type Role = "admin" | "user" | "agent";

export const authorizedRoles = (...role: Role[]) => {
  return requestHandler(async (req, res, next) => {
    if (req.user && role.includes(req.user.role)) {
      next();
    } else if (req.admin && role.includes(req.admin.role)) {
      next();
    } else {
      return ApiError("You don't have enough permission", 403, next);
    }
  });
};
