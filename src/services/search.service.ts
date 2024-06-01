import HttpException from "../common/http-exception";
import { tmdb } from "../lib/tmdb";

export const searchMovie = (param: string, searchTerm: string) => {
  switch (param) {
    case "title":
      return searchMoviesByTitle(searchTerm);
    case "director":
      return searchMoviesByDirector(searchTerm);
    case "actor":
      return searchMoviesByCast(searchTerm);
    default:
      throw new HttpException(400, "Parámetro inválido");
  }
};

const searchMoviesByTitle = async (title: string) => {
  try {
    const movies = (await tmdb.search.movies({ query: title, language: "es" }))
      .results;

    if (!movies.length)
      throw new HttpException(404, "No se encontraron películas");

    return movies;
  } catch (err) {
    throw err;
  }
};

const searchMoviesByDirector = async (personName: string) => {
  try {
    const person = await tmdb.search.people({
      query: personName,
      language: "es",
    });



    const movies = (
      await tmdb.people.details(person.results?.[0]?.id, ["movie_credits"], "es")
    ).movie_credits.crew.filter((movie) => movie.job === "Director");

    return movies;
  } catch (err) {
    throw err;
  }
};

const searchMoviesByCast = async (personName: string) => {
    try {
      const person = await tmdb.search.people({
        query: personName,
        language: "es",
      });
      const movies = (
        await tmdb.people.details(person.results[0].id, ["movie_credits"], "es")
      ).movie_credits.cast;
      return movies;
    } catch (err) {
      throw err;
    }
  };
  
