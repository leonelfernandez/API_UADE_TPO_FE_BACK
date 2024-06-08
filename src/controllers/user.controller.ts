import * as dotenv from "dotenv";
import { NextFunction, Request, Response, Errback } from "express";
import * as UserService from "../services/user.service";

dotenv.config();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId as string;

  try {
    const user = await UserService.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
