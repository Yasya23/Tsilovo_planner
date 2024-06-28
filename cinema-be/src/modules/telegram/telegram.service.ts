import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TelegramModel } from 'src/models/telegram.model';
import { CreateMovieDto } from 'src/typing/dto';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    @InjectModel(TelegramModel)
    private readonly telegramModel: ModelType<TelegramModel>,
  ) {
    this.bot = new Telegraf(process.env.TELEGRAM_TOKEN);

    this.bot.command('start', async (ctx: Context) => {
      console.log('Received /start command');
      const chatId = ctx.chat?.id.toString();
      if (chatId) {
        await this.addChatId(chatId);
        ctx.reply(
          'Welcome! You are now subscribed to notifications about new movies.',
        );
        console.log(`Chat ID: ${chatId} added to subscribers.`);
      }
    });
  }

  private init() {
    this.bot
      .launch()
      .then(() => {
        console.log('Bot started');
      })
      .catch((err) => {
        console.error('Failed to start bot', err);
      });
  }

  async onModuleInit() {
    this.init();
  }

  async addChatId(chatId: string): Promise<void> {
    await this.telegramModel
      .findOneAndUpdate({ chatId }, { chatId }, { upsert: true, new: true })
      .exec();
  }

  async getAllChatIds(): Promise<string[]> {
    const chatIds = await this.telegramModel.find().exec();
    return chatIds.map((doc) => doc.chatId);
  }

  async sendNotification(movieDto: CreateMovieDto) {
    const chatIds = await this.getAllChatIds();
    const message = `<b>New Movie Available: ${movieDto.title}</b>`;
    const photo = movieDto?.poster;
    const options: ExtraReplyMessage = {
      reply_markup: {
        inline_keyboard: [[{ url: 'http://example.com', text: 'Go to watch' }]],
      },
    };
    for (const chatId of chatIds) {
      if (photo) {
        await this.bot.telegram.sendPhoto(chatId, photo, {
          caption: message || '',
          ...options,
          parse_mode: 'HTML',
        });
      } else {
        await this.bot.telegram.sendMessage(chatId, message, {
          ...options,
          parse_mode: 'HTML',
        });
      }
    }
  }
}
