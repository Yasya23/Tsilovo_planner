import { Genre } from './genre.type';
import { Actor } from './actor.type';

export type Movie = {
  id: string;
  title: string;
  poster: string;
  description: string;
  videoUrl: string;
  date: Date;
  rating: number;
  country: string;
  type: string;
  photo: string;
  genres?: Genre[];
  actors?: Actor[];
};
