import { Router, Request, Response } from "express";
import * as AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import * as AuthService from "../services/auth.service";
import validateFields from "../middleware/validation-error.middleware";
import isAuth from "../middleware/is-auth.middleware";
import User from "../models/user/user.model";

export const authRoutes = Router();

authRoutes.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const user = await AuthService.find(req.body.email);
        if (!user?.active) {
          return Promise.reject("User not found");
        }
      })
      .normalizeEmail(),
  ],
  validateFields,
  AuthController.login
);

authRoutes.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
          return Promise.reject("E-mail already exists!");
        }
      })
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password of at least 6 characters."),

    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be equal.");
      }

      return true;
    }),
  ],
  validateFields,

  AuthController.register
);

authRoutes.put("/confirmation/:token", AuthController.confirmAccount);

authRoutes.post(
  "/sendResetPasswordEmail",
  [body("email").isEmail().normalizeEmail()],
  validateFields,
  AuthController.sendResetPasswordEmail
);

authRoutes.get("/reset/:token", AuthController.grantAccessToResetPassword);

authRoutes.post(
  "/resetPassword",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password of at least 6 characters."),

    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should be equal.");
      }

      return true;
    }),
  ],
  validateFields,
  AuthController.resetPassword
);
