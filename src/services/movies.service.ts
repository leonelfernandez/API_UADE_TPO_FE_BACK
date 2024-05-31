import Movie from "../models/user/user.model";
import HttpException from "../common/http-exception";
import Film from "../models/film/film.model";
import { tmdb } from "../lib/tmdb";




export const getMovieById = async (id: number)=> {
    try {
        const movie = await tmdb.movies.details(id, ["credits"], "es");

        if(!movie) throw new HttpException(404, "No se encontró la película");

        return movie;
    } catch(err) {
        throw err;
    }
};

export const getGenres = async () => {
    try {
        const genres = await tmdb.genres.movies({language: "es"});

        if(!genres.genres.length) throw new HttpException(404, "No se encontraron géneros");

        return genres;
    } catch(err) {
        throw err;
    }
}

export const getMoviesByGenres = async (genreIds: number[]) => {
    try {
       const parsedGenres = genreIds.join(",");
       const movies = await tmdb.discover.movie({with_genres: parsedGenres, language: "es"});

       if(!movies.results.length) throw new HttpException(404, "No se encontraron películas");

       return movies;
    } catch(err) {
        throw err;
    }
};


