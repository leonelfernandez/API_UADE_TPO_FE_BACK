import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { validateFields } from "../middleware/validation-error.middleware";
import { getUser } from "../services/user.services";
import { loginController, registerController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (_, { req }) => {
        const user = await getUser(req.body.email);
        if (!user?.active) {
          return Promise.reject("User not found");
        }
      })
      .normalizeEmail(),
  ],
  validateFields,
  loginController
);

authRoutes.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (_, { req }) => {
        const user = await getUser(req.body.email);
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
  registerController
);

// authRoutes.put("/confirmation/:token", AuthController.confirmAccount);

// authRoutes.post(
//   "/sendResetPasswordEmail",
//   [body("email").isEmail().normalizeEmail()],
//   validateFields,
//   AuthController.sendResetPasswordEmail
// );

// authRoutes.get("/reset/:token", AuthController.grantAccessToResetPassword);

// authRoutes.post(
//   "/resetPassword",
//   [
//     body("email")
//       .isEmail()
//       .withMessage("Please enter a valid email.")
//       .normalizeEmail(),

//     body("password")
//       .isLength({ min: 6 })
//       .withMessage("Please enter a password of at least 6 characters."),

//     body("passwordConfirm").custom((value, { req }) => {
//       if (value !== req.body.password) {
//         throw new Error("Password should be equal.");
//       }

//       return true;
//     }),
//   ],
//   validateFields,
//   AuthController.resetPassword
// );


export { authRoutes };