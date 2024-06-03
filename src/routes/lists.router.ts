import { Router } from "express";
import * as ListController from "../controllers/list.controller";
import validateFields from "../middleware/validation-error.middleware";
import { body } from "express-validator";

export const listRoutes = Router();

//Crear y actualizar lista de Objetos<List>
listRoutes.put("/create/:id", ListController.addNewListToUser);

//Eliminar una lista
listRoutes.put("/delete/:id", ListController.deleteUserList);

//Obtener informacion de una lista especifica de un usuario especifico
listRoutes.get("/listinfo/:id", ListController.getListInfo);



listRoutes.put("/addfilm/:id", ListController.addFilmToList);

listRoutes.put("/deletefilm/:id", ListController.deleteFilmFromList);

// //Buscar peliculas por titulo, director o actor
// movieRoutes.put(
//   "/search",
//   [body("param").exists().isString().notEmpty().withMessage("Por favor, enviar parámetro de búsqueda")],
//   validateFields,
//   MoviesController.searchMovies
// )