import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  try {
    await AuthService.register(username, email, password);

    res.status(201).json({
      message: "Usuario creado!",
    });
  } catch (err) {
    next(err);
  }
};

export const confirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token;

  try {
    await AuthService.activateAccount(token);

    res.status(201).json({
      message: "Usuario actualizado!",
      active: true,
    });
  } catch (err) {
    next(err);
  }
};

export const sendResetPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email as string;

  try {
    await AuthService.sendResetPasswordEmail(email);

    res.status(201).json({
      message: "Email enviado!",
    });
  } catch (err) {
    next(err);
  }
};

export const grantAccessToResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.params.token as string;
  try {
    const user = await AuthService.grantAccessToResetPassword(token);
    res.status(200).json({ email: user.email });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    await AuthService.resetPassword(email, password);

    res.status(200).json({ message: "Constraseña cambiada!" });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const token = await AuthService.login(email, password);

    res.status(200).json({
      jwt: token,
    });
  } catch (err) {
    next(err);
  }
};
