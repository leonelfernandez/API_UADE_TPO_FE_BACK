import Movie from "../models/user/user.model";
import HttpException from "../common/http-exception";
import * as dotenv from "dotenv";
import Film from "../models/film/film.model";

dotenv.config();

const apiKey: string = process.env.API_KEY as string;
const apiURL: string = process.env.API_URL as string;

const getIdByMovieGenre = async (genre: string) => { 
    return await fetch(`${apiURL}/genre/movie/list`)
        .then(response => response.json())
        .then(moviesGenres => moviesGenres["genres"].filter((g: { name: string }) => g.name === genre))
        .catch(err => { throw new Error(err) });
}


export const getMovieById = async (id: string)=> {
    try {
        return await fetch(`${apiURL}/movie/${id}?append_to_response=credits&language=es`)
            .then(response => response.json());
    } catch(err) {
        throw err;
    }
};

export const getMoviesByGenre = async (genre: string, page: string) => {
    try {
        const genreId = await getIdByMovieGenre(genre);

        return await fetch(`${apiURL}/discover/movie?language=es&with_genres=${genreId}&page=${page}`)
            .then(response => response.json());
    } catch(err) {
        throw err;
    }
};


// export const getMoviesByActor = async (actorId: string) => { 
//     try {
//         const movies = await fetch(`${apiURL}/person/${actorId}?append_to_response=movie_credits`)
//             .then(response => response.json());
//         return movies["movie_credits"]["cast"];
//     } catch(err) {
//         throw err;
//     }
// }

