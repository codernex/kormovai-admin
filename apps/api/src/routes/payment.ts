import { Router } from "express";
import { authorizedRoles, isAuthenticated } from "@/middleware";
import { PaymentController } from "@/controller";

export const paymentRoutes = Router() as Router;

const { createPayment, updatePayment, getPayments } = new PaymentController();

paymentRoutes
  .route("/")
  .get(isAuthenticated, getPayments)
  .post(isAuthenticated, createPayment);
paymentRoutes.patch(
  "/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updatePayment
);
