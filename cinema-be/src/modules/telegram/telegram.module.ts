import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramModel } from 'src/models/telegram.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TelegramModel,
        schemaOptions: {
          collection: 'Telegram',
        },
      },
    ]),
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
