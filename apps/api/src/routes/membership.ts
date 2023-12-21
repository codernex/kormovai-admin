import { MembershipController } from "@/controller";
import express, { Router } from "express";
import { authorizedRoles, isAuthenticated } from "@/middleware";

export const membershipRoutes: Router = express.Router();

const membership = new MembershipController();

membershipRoutes
  .route("/")
  .get(isAuthenticated, membership.fetchMembership)
  .post(isAuthenticated, authorizedRoles("admin"), membership.createMembership);

membershipRoutes
  .route("/:id")
  .patch(isAuthenticated, authorizedRoles("admin"), membership.updateMembership)
  .delete(
    isAuthenticated,
    authorizedRoles("admin"),
    membership.deletMembership
  );
