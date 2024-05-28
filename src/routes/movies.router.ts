import { Router } from "express";
import * as MoviesController from "../controllers/movie.controller";
import validateFields from "../middleware/validation-error.middleware"; 

export const filmRoutes = Router();

//Obtener una pelicula
filmRoutes.get("/films/:id", validateFields, MoviesController.getMovieById);

//Obtener todas las peliculas por genero
filmRoutes.get("/films/genre/:genreId", validateFields, MoviesController.getMoviesByGenre);

//filmRoutes.get("/actor/:id", validateFields, MoviesController.getMoviesByActor);