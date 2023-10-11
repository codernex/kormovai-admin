import { UserController } from "controller/user";
import express, { Router } from "express";
import { authorizedRoles, isAuthenticated } from "@/middleware";

export const userRoutes: Router = express.Router();

const userController = new UserController();

userRoutes.get(
  "/",
  isAuthenticated,
  authorizedRoles("admin"),
  userController.getUsers
);
userRoutes.post("/", userController.createUser);
userRoutes.delete(
  "/:id",
  authorizedRoles("user", "admin"),
  userController.deleteUser
);
