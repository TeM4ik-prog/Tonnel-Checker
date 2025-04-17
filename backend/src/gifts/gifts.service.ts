import { DatabaseService } from '@/database/database.service';
import { TelegramService } from '@/telegram/telegram.service';
import { IUserFilters } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateGiftDto } from './dto/create-gift.dto';
import { fetchPattern } from './dto/fetch-pattern';
import { BackgroundItem, BACKGROUNDS } from './entities/backgrounds';
import { ModelItem, MODELS_GIFTS } from './entities/output';

@Injectable()
export class GiftsService implements OnModuleInit {
  constructor(
    private readonly database: DatabaseService,
    private readonly telegramService: TelegramService,
    private readonly usersService: UsersService
  ) { }

  // private gifts: string[] = [
  //   "Jack-in-the-Box",
  //   "Cookie Heart",
  //   "Evil Eye",
  //   "Ginger Cookie",
  //   "Tama Gadget",
  //   "Trapped Heart",
  //   "Jelly Bunny",
  //   "Homemade Cake",
  //   "Witch Hat",
  //   "Spiced Wine"
  // ]


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
    const userDev = await this.usersService.findUserByTelegramId(2027571609)
    const userFilters = userDev.UserFilters

    // console.log(userFilters)

    if (!userFilters || userFilters.length === 0) {
      console.log('Нет фильтров для проверки');
      return;
    }
    const resultDataUpdate = []

    const uniqueGifts = [...new Set(userFilters.map(filter => filter.nft))];


    interface Combination {
      gift: string;
      model: string;
      background: string;
    }

    interface GiftCombinations {
      [giftName: string]: Combination[];
    }



    const combinations = []

    for (const gift of uniqueGifts) {
      const giftFilters = userFilters.find(filter => filter.nft === gift)

      const models = (giftFilters?.models as string[]) || []
      const backgrounds = (giftFilters?.backgrounds as string[]) || []

      const giftComb = []

      if (models.length && backgrounds.length) {
        for (const model of models) {
          for (const background of backgrounds) {
            giftComb.push({ gift, model, background })
          }
        }
      } else if (models.length) {
        for (const model of models) {
          giftComb.push({ gift, model })
        }
      } else if (backgrounds.length) {
        for (const background of backgrounds) {
          giftComb.push({ gift, background })
        }
      } else {
        giftComb.push({ gift })
      }

      combinations.push({ [gift]: giftComb })
    }

    console.log(combinations[0])
    // console.log(JSON.stringify(combinations))




    





    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];

      // console.log(combination)
      const giftName = Object.keys(combination)[0];


      const data = []

      for (let i = 0; i < combination[giftName].length; i++) {
        const element = combination[giftName][i];

        const items: CreateGiftDto[] = await fetchPattern(element.gift, element.background, element.model);

        console.log(items)

        if (items.length !== 2) {
          console.log(`Skipping ${giftName} - items.length is 2`);
          continue;
        }

        data.push(items)




        // __________


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

        if (profit > userDev.minProfit) {
          await this.telegramService.sendMessageGoodPriceGiftToAll(
            items[0],
            items[1],
            profit,
            sellPrice
          );
        }
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
      // console.log(data)
      console.log('created');
    }
    else {
      console.error('no data')
    }
  }




  // _________________






  async createGiftModels(data: ModelItem[]): Promise<void> {
    const resultData = data.map((elem) => ({ name: elem._id, models: elem.models, backgrounds: elem.backgrounds, symbols: elem.symbols }))
    await this.database.giftModel.createMany({
      data: resultData,
    });
  }


  async createBackgrounds(data: BackgroundItem[]) {
    const resultData = data.map((elem) => ({ backdrop: elem.backdrop, ...elem.color }))
    await this.database.giftBackground.createMany({
      data: resultData
    })

  }


  async getGiftModels() {
    return await this.database.giftModel.findMany()
  }

  async applyFilters(filters: IUserFilters[], userId: string) {
    await this.database.userFilters.deleteMany({
      where: {
        userId
      }
    });

    return await this.database.userFilters.createMany({
      data: filters.map(filter => ({
        ...filter,
        userId
      })

      ),



    });
  }

  @Cron('*/60 * * * * *')
  async handleCron() {
    await this.fetchGiftsDataFromTonnel();
  }


  async onModuleInit() {
    await this.fetchGiftsDataFromTonnel();

    // await this.createGiftModels(MODELS_GIFTS)
    // await this.createBackgrounds(BACKGROUNDS)

  }
}
