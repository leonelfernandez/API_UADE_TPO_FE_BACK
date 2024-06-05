import { Router } from "express";
import * as ListController from "../controllers/list.controller";
import isAuth from "../middleware/is-auth.middleware";

export const listRoutes = Router();

//Crear y actualizar lista de Objetos<List>
listRoutes.post("/create", isAuth, ListController.addNewListToUser);

//Eliminar una lista
listRoutes.post("/delete/:listId", isAuth, ListController.deleteUserList);

//Obtener informacion de una lista especifica de un usuario especifico
listRoutes.get("/listInfo/:listId", isAuth, ListController.getListInfo);



listRoutes.post("/addFilm/:listId", isAuth, ListController.addFilmToList);

listRoutes.post("/deleteFilm/:listId", isAuth, ListController.deleteFilmFromList);

// //Buscar peliculas por titulo, director o actor
// movieRoutes.put(
//   "/search",
//   [body("param").exists().isString().notEmpty().withMessage("Por favor, enviar parámetro de búsqueda")],
//   validateFields,
//   MoviesController.searchMovies
// )