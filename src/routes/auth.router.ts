import { NextFunction, Request, Response, Errback, Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { body } from "express-validator";
import * as AuthService from "../services/auth.service";
import validateFields from "../middleware/validation-error.middleware";
import User from "../models/user/user.model";

export const authRoutes = Router();

authRoutes.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Por favor, ingresa un correo electrónico válido.")
      .custom(async (value, { req }) => {
        const user = await AuthService.findByEmail(req.body.email);
        if (!user?.active) {
          return Promise.reject("Usuario no encontrado");
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
      .withMessage("Por favor, ingresa un correo electrónico válido.")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
          return Promise.reject("¡El correo electrónico ya existe!");
        }
      })
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Por favor, ingresa una contraseña de al menos 6 caracteres."),

    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas deben ser iguales.");
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
      .withMessage("Por favor, ingresa un correo electrónico válido.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Por favor, ingresa una contraseña de al menos 6 caracteres."),

    body("passwordConfirm").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas debe ser iguales.");
      }

      return true;
    }),
  ],
  validateFields,
  AuthController.resetPassword
);
