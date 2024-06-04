import { Router } from "express";
import * as ListController from "../controllers/list.controller";
import isAuth from "../middleware/is-auth.middleware";

export const listRoutes = Router();

//Crear y actualizar lista de Objetos<List>
listRoutes.put("/create/:id", isAuth, ListController.addNewListToUser);

//Eliminar una lista
listRoutes.put("/delete/:id", isAuth, ListController.deleteUserList);

//Obtener informacion de una lista especifica de un usuario especifico
listRoutes.get("/listinfo/:id", isAuth, ListController.getListInfo);



listRoutes.put("/addfilm/:id", isAuth, ListController.addFilmToList);

listRoutes.put("/deletefilm/:id", isAuth, ListController.deleteFilmFromList);

// //Buscar peliculas por titulo, director o actor
// movieRoutes.put(
//   "/search",
//   [body("param").exists().isString().notEmpty().withMessage("Por favor, enviar parámetro de búsqueda")],
//   validateFields,
//   MoviesController.searchMovies
// )