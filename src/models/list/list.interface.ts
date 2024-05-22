import { Film } from '../film/film.interface';

export interface List {
    id: number;
    title: string;
    films: Film[];
    canDelete?: boolean,
  }