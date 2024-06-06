import { Document } from "mongodb";
import { Movie } from "tmdb-ts";

export type ListTag = "to_watch" | "watched" | "favorite";

export interface List extends Document {
    title: string;
    films: Array<Movie>;
    canDelete?: boolean,
    tag?: ListTag
  }