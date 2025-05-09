import { DatabaseService } from '@/database/database.service';
import { TelegramService } from '@/telegram/telegram.service';
import { UsersService } from '@/users/users.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { fetchPattern } from './dto/fetch-pattern';
import { ModelItem, MODELS_GIFTS } from './entities/output';

import { IFilters, IUserGiftData } from '@/types/types';
import { Cron } from '@nestjs/schedule';
import { Browser } from 'puppeteer';
import { BackgroundItem } from './entities/backgrounds';

import puppeteer from 'puppeteer-extra';
import { fetchProxyPattern } from './dto/proxyFetch';
import { buildLink } from '@/utils/buildFilterLink';
import { FiltersService } from '@/filters/filters.service';
import { getRandomProxy, proxies } from './proxies';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());




@Injectable()
export class GiftsService implements OnModuleInit {
  private browser: Browser | null = null

  private readonly PROXY = {
    host: '46.8.15.16',
    port: 5500,
    username: 'shegzfs',
    password: 'gukwiHj66dtnrsdb'
  };

  constructor(
    private database: DatabaseService,
    private readonly telegramService: TelegramService,
    private readonly usersService: UsersService,
    private readonly filtersService: FiltersService

  ) { }



  calculateProfit(firstPrice: number, secondPrice: number) {
    const buyPrice = parseFloat((firstPrice * 1.1).toFixed(3)); // 8.8
    const sellPrice = parseFloat((secondPrice - 0.1).toFixed(3)); // 9.9 
    const profit = parseFloat(((sellPrice - buyPrice)).toFixed(3));

    // console.log(buyPrice, profit, sellPrice)

    return { profit, sellPrice };
  }

  async findLastUpdate(userId: string) {
    return await this.database.packGiftsDataUpdate.findFirst({

      where: {
        userId
      },


      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        GiftsDataUpdate: {
          orderBy: {
            profit: 'desc'
          },

          select: {
            updatedAt: true,
            Gifts: true,
            filterLink: true,
            profit: true,
            sellPrice: true
          }
        }
      }
    });
  }


  async deleteGiftPacksByProfit() {
    const deleted = await this.database.gift.deleteMany({
      where: {
        GiftsDataUpdate: {
          profit: { lt: 0.5 },
        },
      },
    });

    console.log('deleted gifts', deleted.count)


    await this.database.packGiftsDataUpdate.deleteMany({
      where: {
        GiftsDataUpdate: {
          none: {},
        },
      },
    });
  }


  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          `--proxy-server=${this.PROXY.host}:${this.PROXY.port}`,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
          '--single-process',
          '--blink-settings=imagesEnabled=false',
        ],
        defaultViewport: { width: 1920, height: 1080 },
        ignoreDefaultArgs: ['--enable-automation'],
      });
    }
    return this.browser;
  }





  async onSendDataToUsers() {
    const users = await this.usersService.getAllUsersData()

    users.forEach(async (user, index) => {
      const proxy = proxies[index]

      console.log(user.id)
      await this.fetchGiftsDataFromTonnel(user, proxy)

    });


  }

  async fetchGiftsDataFromTonnel(user: IUserGiftData, proxy) {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    await page.authenticate({
      username: proxy.username,
      password: proxy.password,
    });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'media', 'font', 'stylesheet'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // ___________


    const resultDataUpdate = []
    const combinations = []
    const filters = await this.filtersService.getUserFilters(user.id)
    const activeChat = await this.database.activeChat.findUnique({
      where: { userTelegramId: user.telegramId }
    })
    // const users = await this.usersService.getAllUsersData()

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

    for (let i = 0; i < combinations.length; i++) {
      const combination = combinations[i];
      const giftName = Object.keys(combination)[0];
      const data = []

      for (let i = 0; i < combination[giftName].length; i++) {
        const element = combination[giftName][i];
        console.log(element.gift, element.background, element.model, page)

        const items: CreateGiftDto[] = await fetchProxyPattern(element.gift, element.background, element.model, page);

        // console.log(items)

        if (items.length !== 2) {
          console.log(`Skipping ${giftName} - items.length is not 2`);
          continue;
        }

        data.push(items)

        // __________

        const { profit, sellPrice } = this.calculateProfit(items[0]?.price, items[1]?.price);

        const createdGiftsDataUpdate = await this.database.giftsDataUpdate.create({
          data: {
            profit,
            sellPrice,
            filterLink: buildLink(filters.find(filter => filter.nft == items[0].name), items[0]),

            Gifts: {
              create: items.map(item => ({
                giftId: item.gift_id,
                giftNum: item.gift_num,
                name: item.name,
                price: item.price,
                model: item.model,
                symbol: item.symbol,
                backdrop: item.backdrop,
              }))
            },
          },
          include: {
            Gifts: true
          }
        });

        resultDataUpdate.push(createdGiftsDataUpdate);

        await this.telegramService.sendMessageGoodPriceGiftToAll(
          createdGiftsDataUpdate,

          profit,
          sellPrice,

          activeChat,
          user,
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
          userId: user.id,
          GiftsDataUpdate: {
            connect: resultDataUpdate.map(update => ({ id: update.id })),
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



  @Cron('*/60 * * * * *')
  async handleCron() {
    await this.onSendDataToUsers();
  }


  async onModuleInit() {

    try {
      await this.getBrowser();
    } catch (error) {
      console.error('Error during onModuleInit:', error);
    }


    // await this.getBrowser()
    await this.onSendDataToUsers();




    // puppeteer.use(StealthPlugin());


    await this.createGiftModels(MODELS_GIFTS)
    // await this.createBackgrounds(BACKGROUNDS)

  }
}
