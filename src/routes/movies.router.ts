import { Router } from "express";
import * as MoviesController from "../controllers/movie.controller";
import validateFields from "../middleware/validation-error.middleware";
import { body } from "express-validator";

export const movieRoutes = Router();

//Obtener peliculas populares
movieRoutes.get("/popular", MoviesController.getPopularMovies);

//Obtener una pelicula
movieRoutes.get("/byId/:id", MoviesController.getMovieById);

//Obtener todos los generos
movieRoutes.get("/genres", MoviesController.getGenres);

//Buscar peliculas por titulo, director o actor
movieRoutes.put(
  "/search",
  [body("param").exists().isString().notEmpty().withMessage("Por favor, enviar parámetro de búsqueda")],
  validateFields,
  MoviesController.searchMovies
)