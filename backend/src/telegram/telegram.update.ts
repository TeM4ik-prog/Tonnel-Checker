import { Update, Start, Help, Command, Ctx, Message, On } from 'nestjs-telegraf';
import { Context, Input } from 'telegraf';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { GiftsService } from '@/gifts/gifts.service';

@Update()
export class TelegramUpdate {
    constructor(
        private readonly telegramService: TelegramService,
        private configService: ConfigService,
        private giftsService: GiftsService
    ) { }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        this.telegramService.addToActiveChats(ctx.message);


        const stream = this.telegramService.getPhotoStream("./public/images/sticker.png")

        await ctx.telegram.sendPhoto(ctx.chat.id, stream, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Запустить приложение',
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
        const value = await this.giftsService.getMinProfit()

        console.log(value)
        await ctx.reply('minProfit: ' + value)
    }

    @Command('setminprofit')
    async onSetMinProfit(@Ctx() ctx: Context) {
      if (!('text' in ctx.message)) {
        return ctx.reply('❌ Это не текстовое сообщение!');
      }
    
      const parts = ctx.message.text.trim().split(' ');
      
      if (parts.length < 2) {
        return ctx.reply('❌ Введите число после команды, например: /setMinProfit 0.5');
      }
    
      const value = parseFloat(parts[1]);
    
      if (isNaN(value)) {
        return ctx.reply('❌ Значение должно быть числом, например: /setMinProfit 0.5');
      }
    
      try {
        const result = await this.giftsService.setMinProfit(value);
        await ctx.reply(`✅ Мин. прибыль установлена: ${value.toFixed(2)} TON`);
      } catch (err) {
        console.error(err);
        await ctx.reply('❌ Произошла ошибка при сохранении значения');
      }
    }






    // @On('message')
    // async onMessage(@Ctx() ctx: Context) {
    //     await ctx.reply(`Ты написал: ${ctx.message['text']}`);
    // }
}
