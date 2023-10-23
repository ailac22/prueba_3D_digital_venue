import express from "express";
import { UserController } from "./components/user/controller";
import { UtilsController } from "./components/utils/controller";
import { AuthController } from "./components/auth/controller";
import passport from 'passport';
import { isAdmin, isCustomer } from "./components/utils/middleware";
export const routes = express.Router();

// Generate new password


// Login
routes.post("/login", AuthController.login);

// User endpoints:

routes.use(passport.authenticate('jwt', { session: false }))

routes.get("/user" , isCustomer, UserController.view);
routes.post("/user/transaction", isCustomer, UserController.transaction);

// Admin endpoints.
routes.get("/private/users" , isAdmin, UserController.index);

routes.patch(
  "/private/utils/user/:id/password/reset",
  isAdmin,
  UtilsController.passwordUpdate
);
