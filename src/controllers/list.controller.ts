import { NextFunction, Request, Response, Errback } from "express";
import HttpException from "../common/http-exception";
import * as AuthService from "../services/auth.service";
import { hash, verify } from "argon2";
import User from "../models/user/user.model";
import { Tokens } from "../models/user/user.interface";
import * as dotenv from "dotenv";
import List from "../models/list/list.model";
import * as ListService from "../services/lists.service";
import { Movie } from "tmdb-ts";


dotenv.config();


export const addNewListToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = req.userId as string;
    const title = req.body.title;

  try {

    const list = new List({
        title: title,
        films: [],
        canDelete: true,
    });

    await ListService.createNewList(userId, list);


    res.status(201).json({
      message: "List added to user!",
    });
    
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 422;
      err.message = "Validation failed";
    }

    next(err);
  }
};


export const deleteUserList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId;

  try {

    ListService.deleteList(userId, listId);

    res.status(201).json({
      message: "List deleted from user!",
    });
  } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 422;
      err.message = "Validation failed";
    }

    next(err);
  }

};


export const getListInfo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId;

    try {
        const list = await ListService.getListInfo(userId, listId);
        
        res.status(200).json(list);

    } catch (err: any) {
    if (!(err instanceof HttpException)) {
      err.statusCode = 422;
      err.message = "Validation failed";
    }

    next(err);
  }
};

export const addFilmToList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.userId as string;
    const listId = req.params.listId;
    const film = req.body.film as Movie;
    try {
        
        const list = await ListService.addFilmToList(userId, listId, film);
        
        res.status(201).json({
            message: "Film added to list!",
            list
        });

    } catch (err: any) {
        if (!(err instanceof HttpException)) {
          err.statusCode = 422;
          err.message = "Validation failed";
        }
        next(err);
    }

};

export const deleteFilmFromList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId as string;
    const filmId = req.body.filmId as string;
    try {

        const list = ListService.deleteFilmFromList(userId, listId, filmId);
        
        res.status(201).json({
            message: "Film deleted from list!",
            list,
        });

    } catch (err: any) {
        if (!(err instanceof HttpException)) {
          err.statusCode = 422;
          err.message = "Validation failed";
        }
        next(err);
    }


}

