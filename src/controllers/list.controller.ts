import { NextFunction, Request, Response, Errback } from "express";
import HttpException from "../common/http-exception";
import * as AuthService from "../services/auth.service";
import { hash, verify } from "argon2";
import User from "../models/user/user.model";
import { Tokens } from "../models/user/user.interface";
import * as dotenv from "dotenv";
import List from "../models/list/list.model";
import * as ListService from "../services/lists.service";
import Film from "../models/film/film.model";


dotenv.config();


export const addNewListToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const id = req.params.id;
    const title = req.body.title;

  try {

    const list = new List({
        id: id,
        title: title,
        films: [],
        canDelete: true,
    });

    ListService.createNewList(id, list);

    //const listUpdated = await list.save();


    res.status(201).json({
      message: "List added to user!",
      userId: id,
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
    const id = req.params.id;
    const title = req.body.title;

  try {

    ListService.deleteList(id, title);

    res.status(201).json({
      message: "List deleted from user!",
      userId: id,
      listName: title,
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
    const id = req.params.id;
    const title = req.body.title;
    try {
        const list = await ListService.getListInfo(id, title);
        
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
    const id = req.params.id;
    const title = req.body.title;
    const film = req.body.film;
    try {
        
        const filmO: Film = new Film({
            ...film
        });

        ListService.addFilmToList(id, title, filmO);
        
        res.status(201).json({
            message: "Film added to list!",
            userId: id,
            listName: title,
            film: film,
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
    const id = req.params.id;
    const title = req.body.title;
    const film = req.body.film; //titulo de la pelicula
    try {

        ListService.deleteFilmFromList(id, title, film);
        
        res.status(201).json({
            message: "Film deleted from list!",
            userId: id,
            listName: title,
            film: film,
        });

    } catch (err: any) {
        if (!(err instanceof HttpException)) {
          err.statusCode = 422;
          err.message = "Validation failed";
        }
        next(err);
    }


}

