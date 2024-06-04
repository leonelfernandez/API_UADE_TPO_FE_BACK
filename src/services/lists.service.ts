import mongoose from "mongoose";
import { BaseUser, ExtendedUser } from "../models/user/user.interface";
import User from "../models/user/user.model";
import HttpException from "../common/http-exception";
import { List } from "../models/list/list.interface";
import { Movie } from "tmdb-ts";

export const createNewList = async (id: string, list: List) => { 
    let user: BaseUser | null = null;

    try {
        user = await User.findByIdAndUpdate(
            id,
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

export const deleteList = async (id: string, listTitle: string) => { 
    let user: BaseUser | null = null;
    try {
        user = await User.findByIdAndUpdate(
            id,
            { $pull: { lists: { title: listTitle } } },
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

export const getListInfo = async (id: string, listTitle: string) => {
    let user: BaseUser | null = null;
    let list: List | null = null;

    try {
        user = await User.findById(id).exec();
        if (!user) {
            const err = new HttpException(422, "El usuario no existe.");
            throw err;
        }

    } catch (err) {
        throw err;
    }
    
    return user.lists.find((list) => list.title === listTitle);

};


export const addFilmToList = async (id: string, listTitle: string, newFilm: Movie) => {
    let user: BaseUser | null = null;

    try {
        user = await User.findByIdAndUpdate(
            id,
            { $push: { 'lists.$.films': newFilm } },
            { new: true }
        ).exec();
    
        if (!user) {
            const err = new HttpException(422, "El usuario no existe.");
            throw err;
        }
    } catch (err) {
        throw err;
    }   
};

export const deleteFilmFromList = async (id: string, listTitle: string, filmTitle: string) => {
    let user: BaseUser | null = null;

    try {
        user = await User.findByIdAndUpdate(
            { id, 'lists.title': listTitle },
            { $pull: { 'lists.$.films': filmTitle } },
            { new: true }
        ).exec();
        if (!user) {
            const err = new HttpException(422, "El usuario no existe.");
            throw err;
        }
    } catch (err) {
        throw err;
    }

};


