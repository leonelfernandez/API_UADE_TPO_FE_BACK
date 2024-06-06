import * as dotenv from "dotenv";
import { NextFunction, Request, Response, Errback } from "express";
import * as AuthService from "../services/auth.service";
import HttpException from "../common/http-exception";

dotenv.config();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as string;

  try {
    const user = await AuthService.findById(userId);
    res.status(200).json(user);
  } catch (err: any) {
    next(err);
  }
};
