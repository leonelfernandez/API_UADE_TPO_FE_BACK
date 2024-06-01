import * as MovieService from "../services/movies.service";
import * as SearchService from "../services/search.service";

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


export const searchMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const param = req.body.param as string;
        const searchTerm = req.body.searchTerm as string;
        const movies = await SearchService.searchMovie(param, searchTerm);
        res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
}

export const getPopularMovies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const movies = await MovieService.getPopularMovies();
        res.status(200).json(movies);
    } catch (err) {
        next(err);
    }
}