import { Genre } from './genre.type';
import { Actor } from './actor.type';

export type Movie = {
  _id: string;
  title: string;
  poster: string;
  description: string;
  videoUrl: string;
  year: number;
  rating: number;
  country: string;
  type: string;
  photo: string;
  genres?: Genre[];
  actors?: Actor[];
  ageRestricted?: number;
};
