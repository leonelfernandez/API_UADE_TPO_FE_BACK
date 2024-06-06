import User from "../models/user/user.model";
import HttpException from "../common/http-exception";
import { List } from "../models/list/list.interface";
import { Movie } from "tmdb-ts";

export const createNewList = async (userId: string, list: List) => { 
    try {
        await User.updateOne(
            { _id: userId },
            { $push: { lists: list,}, },
            { new: true, }
        ).exec();
    } catch (err) {
      throw err;
    }
  
};

export const deleteList = async (userId: string, listId: string) => { 
    try {
        await User.updateOne(
            { _id: userId },
            { $pull: { lists: { _id: listId } } },
            { new: true, }
        ).exec();
    } catch (err) {
      throw err;
    }
};

export const getListInfo = async (userId: string, listId: string) => {
    let list: List | null = null;

    try {
        const returnedLists = await User.findOne<{ lists: List[] }>({
            lists: { $elemMatch: { _id: listId } },
        }, { _id: userId, "lists.$": 1 }).exec();

        
        if (!returnedLists?.lists.length) {
            const err = new HttpException(422, "La lista no existe.");
            throw err;
        }

        list = returnedLists?.lists[0];

    } catch (err) {
        throw err;
    }

    return list;

};


export const addFilmToList = async (userId: string, listId: string, newFilm: Movie) => {
    try {
        const filmExists = await User.findOne({
            _id: userId,
            "lists": {
              $elemMatch: {
                _id: listId,
                films: { $elemMatch: { id: newFilm.id } }
              }
            }
          }).exec();

        if (filmExists) {
            const err = new HttpException(422, "La película ya se encuentra en la lista.");
            throw err;
        }

        await User.updateOne(
            { _id: userId, "lists._id": listId },
            { $push: { "lists.$.films": newFilm } },
            {
                new: true, // Return the modified document
                projection: { lists: { $elemMatch: { _id: listId } } } // Project only the matched list
            }
        ).exec();

    } catch (err) {
        throw err;
    }
};

export const toggleFilmToWatchList = async (userId: string, newFilm: Movie) => {
    try {

        const filmExists = await User.findOne({
            _id: userId,
            "lists": {
              $elemMatch: {
                tag: "to_watch",
                films: { $elemMatch: { id: newFilm.id } }
              }
            }
          }).exec();
        
       await User.updateOne(
            { _id: userId, "lists.tag": "to_watch"},
            !filmExists ? { $push: { "lists.$.films": newFilm } } : { $pull: { "lists.$.films": { id: newFilm.id } } },
            {
                new: true, // Return the modified document
                projection: { lists: { $elemMatch: { "lists.tag": "to_watch" } } } // Project only the matched list
            }
        ).exec();

    } catch (err) {
        throw err;
    }
};

export const deleteFilmFromList = async (userId: string, listId: string, filmId: string) => {
    try {
        await User.updateOne(
            { _id: userId, "lists._id": listId },
            { $pull: { "lists.$.films": { _id: filmId } } }
        );
    } catch (err) {
        throw err;
    }
};


