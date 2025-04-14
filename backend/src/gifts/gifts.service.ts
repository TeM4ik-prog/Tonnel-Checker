import { DatabaseService } from '@/database/database.service';
import { TelegramService } from '@/telegram/telegram.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateGiftDto } from './dto/create-gift.dto';
import { fetchPattern } from './dto/fetch-pattern';

@Injectable()
export class GiftsService implements OnModuleInit {
  constructor(
    private readonly database: DatabaseService,
    private readonly telegramService: TelegramService
  ) { }

  private gifts: string[] = [
    "Jack-in-the-Box",
    "Cookie Heart",
    "Evil Eye",
    "Ginger Cookie",
    "Tama Gadget",
    "Trapped Heart",
    "Jelly Bunny",
    "Homemade Cake",
    "Witch Hat",
    "Spiced Wine"
  ]


  calculateProfit(firstPrice: number, secondPrice: number) {
    const buyPrice = parseFloat((firstPrice * 1.1).toFixed(3)); // 8.8
    const sellPrice = parseFloat((secondPrice - 0.1).toFixed(3)); // 9.9 
    const profit = parseFloat(((sellPrice - buyPrice)).toFixed(3));

    // console.log(buyPrice, profit, sellPrice)

    return { profit, sellPrice };
  }

  async findLastUpdate() {
    return await this.database.packGiftsDataUpdate.findFirst({
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        GiftsDataUpdate: {
          orderBy: {
            profit: 'desc'
          },
          include: {
            Gifts: true
          }
        }
      }
    });
  }

  async fetchGiftsDataFromTonnel() {
    const resultDataUpdate = []

    for (const gift of this.gifts) {
      try {
        const items: CreateGiftDto[] = await fetchPattern(gift, "^Black \\(");
        if (items.length < 2) continue
  
        const { profit, sellPrice } = this.calculateProfit(items[0]?.price, items[1]?.price);

        const createdGiftsDataUpdate = await this.database.giftsDataUpdate.create({
          data: {
            profit,
            sellPrice,
            Gifts: {
              create: items.map(item => ({
                giftId: item.gift_id,
                giftNum: item.gift_num,
                name: item.name,
                price: item.price,
                model: item.model,
                symbol: item.symbol,
                backdrop: item.backdrop
              }))
            },

          },
          include: {
            Gifts: true
          }
        });

        resultDataUpdate.push(createdGiftsDataUpdate);


        // await this.telegramService.checkUsersProfitToSendGoodPriceMessages()

        // if (profit > await this.getMinProfit()) {
          // await this.telegramService.deleteAllGoodPriceMessages();

          await this.telegramService.sendMessageGoodPriceGiftToAll(
            items[0],
            items[1],
            profit,
            sellPrice
          );
        // }

      } catch (error) {
        console.error(error);
      }
    }

    if (resultDataUpdate.length > 0) {
      const data = await this.database.packGiftsDataUpdate.create({
        data: {
          GiftsDataUpdate: {
            connect: resultDataUpdate.map(update => ({ id: update.id }))
          }
        },
        include: {
          GiftsDataUpdate: true
        }
      })
      // console.log('created');

    }
    else {
      console.error('no data')
    }
  }

  @Cron('*/20 * * * * *')
  async handleCron() {
    await this.fetchGiftsDataFromTonnel();
  }



  async onModuleInit() {
    // await this.fetchGiftsDataFromTonnel();
  }
}
