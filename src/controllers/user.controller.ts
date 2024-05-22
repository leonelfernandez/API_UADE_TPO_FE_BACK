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
  const userId = (req as any).userId;

  try {
    const user = await AuthService.findById(userId);

    console.log(user);

    res.status(200).json({
        username: user.username,
        role: "USER",
        lists: [
          {
            id: 1,
            title: "Por ver",
            films: [],
            canDelete: false,
          },
          {
            id: 2,
            title: "Preferidas",
            films: [],
            canDelete: false,
          },
          {
            id: 3,
            title: "Vistas",
            films: [],
            canDelete: false,
          },
        ],
    });
  } catch (err: any) {
    next(err);
  }
};
