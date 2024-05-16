import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import isAuth from "../middleware/is-auth.middleware";

export const userRoutes = Router();

userRoutes.get("/", isAuth, UserController.getUser);