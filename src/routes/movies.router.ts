import { Router } from "express";
import * as MoviesController from "../controllers/movie.controller";
import validateFields from "../middleware/validation-error.middleware"; 

export const authRoutes = Router();

//Obtener una pelicula
authRoutes.get("/movie/:id", validateFields, MoviesController.getMovieById);

//Obtener todas las peliculas por genero
authRoutes.get("/movie/:genre", validateFields, MoviesController.getMoviesByGenre);

authRoutes.get("/movies/actor/:id", validateFields, MoviesController.getMoviesByActor);