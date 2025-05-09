import { Injectable, OnModuleInit } from '@nestjs/common';
import type { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

@Injectable()
export class ProxyService implements OnModuleInit {
  private browser: Browser | null = null;

  private readonly PROXY = {
    host: '46.8.15.16',
    port: 5500,
    username: 'shegzfs',
    password: 'gukwiHj66dtnrsdb'
  };
  

  private readonly TARGET_URL = 'https://gifts2.tonnel.network/api/pageGifts';

  private readonly DEFAULT_FILTER = {
    page: 1,
    limit: 1,
    sort: JSON.stringify({ "message_post_time": -1, "gift_id": -1 }),
    filter: JSON.stringify({
      price: { $exists: true },
      refunded: { $ne: true },
      buyer: { $exists: false },
      export_at: { $exists: true },
      asset: "TON"
    }),
    ref: 0,
    price_range: null,
    user_auth: ""
  };

  async onModuleInit() {
    try {
      // console.log('Fetching data on module init...');
      // const data = await this.fetchWithBrowser(this.DEFAULT_FILTER);
      // console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error during onModuleInit fetch:', error);
    }
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

  async fetchWithBrowser(filter: any) {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    console.log(page)

    await page.authenticate({
      username: this.PROXY.username,
      password: this.PROXY.password,
    });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'media', 'font', 'stylesheet'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    const response = await page.evaluate(
      async (url, filter) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(filter),
        });
        return await res.json();
      },
      this.TARGET_URL,
      filter,
    );

    await page.close();
    return response;
  }

  async fetchPattern(
    name: string,
    backdrop: string | null,
    model: string | null = null,
  ) {
    const filter: any = {
      price: { $exists: true },
      refunded: { $ne: true },
      buyer: { $exists: false },
      export_at: { $exists: true },
      asset: "TON",
      gift_name: { $in: [name] },
    };

    if (backdrop) filter.backdrop = { $in: [backdrop] };
    if (model) filter.model = { $in: [model] };

    return this.fetchWithBrowser({
      page: 1,
      limit: 2,
      sort: JSON.stringify({ price: 1 }),
      filter: JSON.stringify(filter),
      ref: 0,
      price_range: null,
      user_auth: ""
    });
  }
}
