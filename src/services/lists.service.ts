import mongoose from "mongoose";
import { BaseUser, ExtendedUser } from "../models/user/user.interface";
import User from "../models/user/user.model";
import HttpException from "../common/http-exception";
import { List } from "../models/list/list.interface";
import { Movie } from "tmdb-ts";

export const createNewList = async (userId: string, list: List) => { 
    let user: BaseUser | null = null;

    try {
        user = await User.findByIdAndUpdate(
            userId,
            { $push: { lists: list,}, },
            { new: true, }
        ).exec();
  
      if (!user) {
        const err = new HttpException(422, "El usuario no existe.");
        throw err;
      }

    } catch (err) {
      throw err;
    }
  
};

export const deleteList = async (userId: string, listId: string) => { 
    let user: BaseUser | null = null;
    try {
        user = await User.findByIdAndUpdate(
            userId,
            { $pull: { lists: { _id: new mongoose.Types.ObjectId(listId) } } },
            { new: true, }
        ).exec();
  
      if (!user) {
        const err = new HttpException(422, "El usuario no existe.");
        throw err;
      }

    } catch (err) {
      throw err;
    }

};

export const getListInfo = async (userId: string, listId: string) => {
    let list: List | null = null;

    try {
        const returnedLists = await User.findOne<{ lists: List[] }>({
            lists: { $elemMatch: { _id: new mongoose.Types.ObjectId(listId) } },
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
    let updatedList: List | null = null;

    try {
        const result = await User.findOneAndUpdate<{ lists: List[] }>(
            { _id: new mongoose.Types.ObjectId(userId), "lists._id": listId },
            { $push: { "lists.$.films": newFilm } },
            {
                new: true, // Return the modified document
                projection: { lists: { $elemMatch: { _id: listId } } } // Project only the matched list
            }
        ).exec();
    
        if (!result?.lists.length) {
            const err = new HttpException(422, "No se encontraron resultados.");
            throw err;
        }

        updatedList = result?.lists[0] as List;
    } catch (err) {
        throw err;
    }
    
    return updatedList;
};

export const deleteFilmFromList = async (userId: string, listId: string, filmId: string) => {
    let updatedList: List | null = null;

    try {
        // Step 1: Update the document
        await User.updateOne(
            { _id: new mongoose.Types.ObjectId(userId), "lists._id": new mongoose.Types.ObjectId(listId) },
            { $pull: { "lists.$.films": { _id: new mongoose.Types.ObjectId(filmId) } } }
        );

        // Step 2: Retrieve the updated list
        updatedList = await User.findOne<List>(
            { _id: new mongoose.Types.ObjectId(userId), "lists._id": new mongoose.Types.ObjectId(listId) },
            { "lists.$": 1 } // Project only the matched list
        ).exec();

        if (!updatedList) {
            const err = new HttpException(422, "No se encontraron resultados.");
            throw err;
        }

    } catch (err) {
        throw err;
    }

    return updatedList;

};


