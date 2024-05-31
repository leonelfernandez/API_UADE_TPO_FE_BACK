import * as MovieService from "../services/movies.service";
import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await MovieService.getMovieById(
      Number.parseInt(req.params.id)
    );
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

export const getMoviesByGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const genreIds = req.body.genre_ids as number[];
    const movies = await MovieService.getMoviesByGenres(genreIds);
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const getGenres = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const genres = await MovieService.getGenres();
        res.status(200).json(genres);
    } catch (err) {
        next(err);
    }
};
