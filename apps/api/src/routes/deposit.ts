import { Router } from "express";
import { authorizedRoles, isAuthenticated } from "@/middleware";
import { DepositController } from "@/controller";

export const depositRoutes = Router() as Router;

const { createDeposit, getDeposits, updateDeposit } = new DepositController();

depositRoutes
  .route("/")
  .get(isAuthenticated, getDeposits)
  .post(isAuthenticated, createDeposit);
depositRoutes.patch(
  "/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateDeposit
);
