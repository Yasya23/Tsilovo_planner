import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ActorModel } from './actor.model';
import { GenreModel } from './genre.model';

export interface MovieModel extends Base {}

export class MovieModel extends TimeStamps {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  poster: string;

  @prop()
  videoUrl: string;

  @prop({ default: false })
  isSendToTelegram?: boolean;

  @prop({ default: 0 })
  rating?: number;

  @prop({ default: 0 })
  countViews?: number;

  @prop()
  date: number;

  @prop()
  duration: number;

  @prop()
  country: string;

  @prop()
  type: string;

  @prop({ ref: () => GenreModel })
  genres?: Ref<GenreModel>[];

  @prop({ ref: () => ActorModel })
  actors?: Ref<ActorModel>[];
}
