import { Film } from '../film/film.interface';

export interface List {
    id: number;
    title: string;
    films: Array<Film>;
    canDelete?: boolean,
  }