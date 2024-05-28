import * as MovieService from "../services/movies.service";
import { NextFunction, Request, Response, Errback } from "express";
import * as dotenv from "dotenv";
import HttpException from "../common/http-exception";
import Film from "../models/film/film.model";

dotenv.config();

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await MovieService.getMovieById(req.params.id);
        res.status(200).json(movie);
    } catch (err) { 
        throw new HttpException(500, "Error al buscar la pelicula");
    }
}

export const getMoviesByGenre = async (req: Request, res: Response) => {
    try {
        let page = req.query.page || 1;
        if (Array.isArray(page)) {
            page = page[0]; 
          }
          if (typeof page !== 'string') {
            page = '1'; 
          }
        const movies = await MovieService.getMoviesByGenre(req.params.genreId, page);
        res.status(200).json(movies);
    } catch (err) { 
        throw new HttpException(500, "Error al buscar las peliculas");
    }
}

// export const getMoviesByActor = async (req: Request, res: Response) => { //Ver con fede
//     try {
//         const moviesByActor = await MovieService.getMoviesByActor(req.params.id);
//         res.status(200).json(moviesByActor);
//     } catch(err) {
//         throw new HttpException(500, "Error al buscar las peliculas del actor/director.");
//     }
// };




