import { Document } from "mongodb";
import { Movie } from "tmdb-ts";


export interface List extends Document {
    title: string;
    films: Array<Movie>;
    canDelete?: boolean,
  }