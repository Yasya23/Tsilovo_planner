import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface TelegramModel extends Base {}

export class TelegramModel extends TimeStamps {
  @prop({ unique: true, required: true })
  chatId: string;
}
