import { Router } from "express";
import { AuthController } from "@/controller";

export const authRoutes: Router = Router();

authRoutes.post("/admin", AuthController.adminLogin);
authRoutes.post("/user", AuthController.userLogin);
authRoutes.get("/logout", AuthController.logOut);
