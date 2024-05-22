import * as MovieService from "../services/movies.service";
import { NextFunction, Request, Response, Errback } from "express";
import * as dotenv from "dotenv";
import HttpException from "../common/http-exception";
import Film from "../models/film/film.model";

dotenv.config();

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await MovieService.getMovieById(req.params.id);
        res.status(200).json(movie);
    } catch (err) { 
        throw new HttpException(500, "Error al buscar la pelicula");
    }

}