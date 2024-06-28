import { NextFunction, Request, Response } from "express";
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
      message: "Lista creada",
    });
    
  } catch (err) {
    next(err);
  }
};


export const deleteUserList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId;

  try {

    ListService.deleteList(userId, listId);

    res.status(201).json({
      message: "Lista eliminada",
    });
  } catch (err) {
    next(err);
  }

};


export const getListInfo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId;

    try {
        const list = await ListService.getListInfo(userId, listId);
        
        res.status(200).json(list);

    } catch (err) {
    next(err);
  }
};


export const toggleFilmToWatchList = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req?.userId as string;
  const film = req.body.film as Movie;
  try {
      
      await ListService.toggleFilmToWatchList(userId, film);
      
      res.status(201).json({
          message: "Lista modificada",
      });

  } catch (err) {
      next(err);
  }

};
export const addFilmToList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.userId as string;
    const listId = req.params.listId;
    const film = req.body.film as Movie;
    try {
        
        await ListService.addFilmToList(userId, listId, film);
        
        res.status(201).json({
            message: "Película añadida a la lista",
        });

    } catch (err) {
        next(err);
    }

};

export const deleteFilmFromList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const listId = req.params.listId as string;
    const filmId = req.body.filmId as string;
    try {

        await ListService.deleteFilmFromList(userId, listId, filmId);
        
        res.status(201).json({
            message: "Lista eliminada",
        });

    } catch (err) {
        next(err);
    }


}

