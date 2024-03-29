import express, { Application } from "express";
import sanitizedConfig from "./config";
import { appDataSource } from "orm.config";
import { errorMiddleware } from "@/middleware";
import {
  adminRoutes,
  authRoutes,
  depositRoutes,
  paymentRoutes,
  userRoutes,
} from "@/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { membershipRoutes } from "routes/membership";

const mountServer = async (app: Application) => {
  const server = app.listen(sanitizedConfig.PORT);

  server.on("listening", () => {
    console.log(`🚀Server running on http://localhost:${sanitizedConfig.PORT}`);
  });

  await appDataSource.initialize();
  /**
   * Cors
   */
  app.use(cors());

  /**
   *
   * System Middleware
   */

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**
   * Api Routes
   */

  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      serverInfo: {
        protocol: req.protocol,
        host: req.hostname,
      },
      userInfo: {
        device: req.headers["user-agent"],
      },
    });
  });

  app.post("/api/v1", (req, res) => {
    res.status(200).json({
      error: "Post request is not allowed",
      statusCode: 404,
    });
  });

  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/membership", membershipRoutes);
  app.use("/api/v1/payments", paymentRoutes);
  app.use("/api/v1/deposits", depositRoutes);
  /**
   * Error Handling
   */

  app.use(errorMiddleware);
};

mountServer(express())
  .then()
  .catch((err) => {
    console.log(err);
  });
