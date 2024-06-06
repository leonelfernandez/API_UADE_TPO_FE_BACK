import HttpException from "../common/http-exception";
import { tmdb } from "../lib/tmdb";
import { Movie, Person, PopularMovies, Search } from "tmdb-ts";




export const getMovieById = async (id: number)=> {
    try {
        const movie = await tmdb.movies.details(id, ["credits"], "es");

        if(!movie) throw new HttpException(404, "No se encontró la película");

        return {
            ...movie,
            cast: movie.credits.cast,
            crew: movie.credits.crew
        };
    } catch(err) {
        throw err;
    }
};

export const getGenres = async () => {
    try {
        const genres = (await tmdb.genres.movies({language: "es"})).genres;

        if(!genres.length) throw new HttpException(404, "No se encontraron géneros");

        return genres;
    } catch(err) {
        throw err;
    }
}


export const getPopularMovies = async () => {
    try {
        const totalPages = 7;
        const moviePromises: Promise<PopularMovies>[] = [];

        for (let page = 1; page <= totalPages; page++) {
            const response = tmdb.movies.popular({ page, language: "es" });
            moviePromises.push(response);
        }

        const popularMovies = await Promise.all(moviePromises);
        if (!popularMovies.length) throw new HttpException(404, "No se encontraron películas");

        const uniqueMovies = popularMovies.flatMap((movies) => movies.results)
            .filter((movie, index, self) => self.findIndex(m => m.id === movie.id) === index);
        
        return uniqueMovies;
    } catch(err) {
        throw err;
    }
}