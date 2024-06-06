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

// Agregar una película a una lista específica
listRoutes.post("/addFilm/:listId", isAuth, ListController.addFilmToList);

// Cambiar el estado de una película en la lista de "para ver"
listRoutes.post("/toggleToWatch", isAuth, ListController.toggleFilmToWatchList);

// Eliminar una película de una lista específica
listRoutes.post("/deleteFilm/:listId", isAuth, ListController.deleteFilmFromList);