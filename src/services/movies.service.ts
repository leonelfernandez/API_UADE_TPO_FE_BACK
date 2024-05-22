import Movie from "../models/user/user.model";
import HttpException from "../common/http-exception";
import { EmailBuilder } from "./email-builder.service";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey: string = process.env.API_KEY as string;

export const getMovieById = async (id: string)=> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&include_adult=false&include_video=false&language=es-Es&page=1`);
        const movie = await response.json();
        return movie;
    } catch(err) {
        throw err;
    }
};