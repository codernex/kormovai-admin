import { Router } from "express";
import { AdminController } from "@/controller";

export const adminRoutes: Router = Router();
const adminController = new AdminController();
adminRoutes.post("/", adminController.createAdmin);
