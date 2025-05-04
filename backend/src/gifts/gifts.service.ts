import { DatabaseService } from '@/database/database.service';
import { TelegramService } from '@/telegram/telegram.service';
import { IFilters } from '@/types/types';
import { UsersService } from '@/users/users.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateGiftDto } from './dto/create-gift.dto';
import { fetchPattern } from './dto/fetch-pattern';
import { BackgroundItem, BACKGROUNDS } from './entities/backgrounds';
import { ModelItem, MODELS_GIFTS } from './entities/output';
import { buildLink } from '@/utils/buildFilterLink';

@Injectable()
export class GiftsService implements OnModuleInit {
  constructor(
    private database: DatabaseService,
    private readonly telegramService: TelegramService,
    private readonly usersService: UsersService
  ) { }

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
         
          select:{
            updatedAt: true,
            Gifts: true,
            profit: true,
            sellPrice: true
          }
        }
      }
    });
  }

  async fetchGiftsDataFromTonnel() {
    const resultDataUpdate = []
    const combinations = []
    const filters = await this.getFilters()

    const activeChats = await this.database.activeChat.findMany()
    const users = await this.usersService.getAllUsersData()

    // console.log(userFilters)

    if (!filters || filters.length === 0) {
      console.log('Нет фильтров для проверки');
      return;
    }


    const uniqueGifts = [...new Set(filters.map(filter => filter.nft))];


    for (const gift of uniqueGifts) {
      const giftFilters = filters.find(filter => filter.nft === gift)

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

    // console.log(combinations[0])
    // console.log(JSON.stringify(combinations))

    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];
      const giftName = Object.keys(combination)[0];

      const data = []
      for (let i = 0; i < combination[giftName].length; i++) {
        const element = combination[giftName][i];
        const items: CreateGiftDto[] = await fetchPattern(element.gift, element.background, element.model);

        // console.log(items)

        if (items.length !== 2) {
          console.log(`Skipping ${giftName} - items.length is not 2`);
          continue;
        }

        data.push(items)

        // __________

        const { profit, sellPrice } = this.calculateProfit(items[0]?.price, items[1]?.price);

        // console.log(items[0]?.gift_id)
        // console.log(items[1]?.gift_id)

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

        console.log(buildLink(filters[0], createdGiftsDataUpdate.Gifts[0]))

        await this.telegramService.sendMessageGoodPriceGiftToAll(
          createdGiftsDataUpdate.Gifts[0],
          createdGiftsDataUpdate.Gifts[1],
          profit,
          sellPrice,
          activeChats,
          users,
          buildLink(filters[i], createdGiftsDataUpdate.Gifts[0])
        );
      }

    }

    if (resultDataUpdate.length > 0) {
      const existingCount = await this.database.packGiftsDataUpdate.count();

      if (existingCount > 100) {
        await this.database.packGiftsDataUpdate.deleteMany();
        console.log('Deleted all records because count > 100');
      }

      const data = await this.database.packGiftsDataUpdate.create({
        data: {
          GiftsDataUpdate: {
            connect: resultDataUpdate.map(update => ({ id: update.id }))
          }
        },
        include: {
          GiftsDataUpdate: true
        }
      });

      console.log('created');
    } else {
      console.error('no data');
    }


  }


  // ___________-

  async getFilters() {
    return await this.database.filters.findMany()
  }


  async createGiftModels(data: ModelItem[]): Promise<void> {
    const existingGiftsModel = await this.database.giftModel.findFirst()
    // console.log(existingGiftsModel)
    if (existingGiftsModel) return


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

  async applyFilters(filters: IFilters[]) {
    await this.database.filters.deleteMany()

    await this.fetchGiftsDataFromTonnel();

    return await this.database.filters.createMany({
      data: filters.map(filter => ({
        ...filter
      })),
    });
  }

  @Cron('*/60 * * * * *')
  async handleCron() {
    await this.fetchGiftsDataFromTonnel();
  }


  async onModuleInit() {
    await this.fetchGiftsDataFromTonnel();

    await this.createGiftModels(MODELS_GIFTS)
    // await this.createBackgrounds(BACKGROUNDS)

  }
}
