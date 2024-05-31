import { Router } from "express";
import * as MoviesController from "../controllers/movie.controller";
import validateFields from "../middleware/validation-error.middleware";
import { body } from "express-validator";

export const movieRoutes = Router();

//Obtener una pelicula
movieRoutes.get("/byId/:id", MoviesController.getMovieById);

//Obtener todos los generos
movieRoutes.get("/genres", MoviesController.getGenres);

//Obtener todas las peliculas por genero
movieRoutes.post(
  "/byGenres",
  [body("genre_ids").exists().isArray().notEmpty().withMessage("Por favor, enviar lista de géneros")],
  validateFields,
  MoviesController.getMoviesByGenre
);
