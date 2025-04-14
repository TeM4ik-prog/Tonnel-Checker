import { Update, Start, Help, Command, Ctx, Message, On } from 'nestjs-telegraf';
import { Context, Input, Scenes } from 'telegraf';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { GiftsService } from '@/gifts/gifts.service';
import { UsersService } from '@/users/users.service';
import { BotScenes } from '@/types/types';
import { formatMessage } from '@/utils/formatMessage';



@Update()
export class TelegramUpdate {
  constructor(
    private readonly telegramService: TelegramService,
    private configService: ConfigService,
    private giftsService: GiftsService,
    private readonly userService: UsersService
  ) { }


  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.telegramService.addToActiveChats(ctx.message)

    await this.userService.findOrCreateUser(ctx.from)

    const stream = this.telegramService.getPhotoStream("./public/images/sticker.png")
    await ctx.telegram.sendPhoto(ctx.chat.id, stream, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Запустить приложение' + this.configService.get('APP_URL'),
            web_app: { url: this.configService.get('APP_URL') },
          }],
        ],
      },
    });

  }

  @Help()
  async onHelp(@Ctx() ctx: Context) {
    await ctx.reply(`Вот список доступных команд: \n/start \n/help \n/info`);
  }

  @Command('info')
  async onInfo(@Ctx() ctx: Context) {
    const info = this.telegramService.getInfo(ctx.from?.id);
    await ctx.reply(`Информация: ${info}`);
  }

  @Command('ping')
  async onPing(@Ctx() ctx: Context) {
    await ctx.reply('pong')
  }

  @Command('getminprofit')
  async onGetMinProfit(@Ctx() ctx: Context) {

    const minProfit = await this.userService.getUserMinProfit(ctx.from.id)

    const message = formatMessage([
      `Ваш текущий минимальный профит: ${minProfit} TON`,
      '',
      'Вы будете получать уведомления только о сделках выше этого значения.',
      '',
      'Чтобы изменить порог, используйте команду: /setminprofit',
    ],
      {
        style: 'markdownv2',
        emoji: '📈',
      }
    );

    await ctx.reply(message.text, {
      parse_mode: message.parse_mode,
    });
  }

  @Command('setminprofit')
  async onSetMinProfit(@Ctx() ctx: Scenes.SceneContext) {
    return ctx.scene.enter(BotScenes.MIN_PROFIT);
  }






  @On('message')
  async onText(@Ctx() ctx: Context) {

    console.log('message')

  }
}
