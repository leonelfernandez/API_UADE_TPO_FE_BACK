/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import { authRoutes } from "./routes/auth.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { userRoutes } from "./routes/user.router";
import { movieRoutes } from "./routes/movies.router";
import { listRoutes } from "./routes/lists.router";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

/**
 * App Variables
 */

if (!process.env.PORT && !process.env.DATABASE_CONNECTION) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const DATABASE_CONNECTION: string = process.env.DATABASE_CONNECTION  as string;

const app = express();

/**
 *  App Configuration
 */

app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/list", listRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

const connection = async () => {
  await connect(DATABASE_CONNECTION);
  app.listen(PORT);
  console.log("Client connected");
};

connection();
