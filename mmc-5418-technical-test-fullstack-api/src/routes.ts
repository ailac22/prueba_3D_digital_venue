import express from "express";
import { UserController } from "./components/user/controller";
import { UtilsController } from "./components/utils/controller";
import { AuthController } from "./components/auth/controller";
import passport from 'passport';
export const routes = express.Router();

// Generate new password
routes.patch(
  "/private/utils/user/:id/password/reset",
  UtilsController.passwordUpdate
);

// Login
routes.post("/login", AuthController.login);

// User endpoints:
routes.get("/user", UserController.view);
routes.post("/user/transaction", passport.authenticate('jwt', { session: false }), UserController.transaction);

// Admin endpoints.
routes.get("/private/users", UserController.index);
