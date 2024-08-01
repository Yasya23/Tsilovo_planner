import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from './movie.model';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  password: string;

  @prop()
  name: string;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ ref: () => MovieModel })
  favorites?: Ref<MovieModel>[];
}
