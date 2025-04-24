import { HttpsProxyAgent } from 'https-proxy-agent';
import { getRandomProxy } from '../proxies';

export const fetchPattern = async (name: string, backdrop: string | null, model: string | null = null) => {
  try {
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

    const proxy = getRandomProxy();
    const agent = new HttpsProxyAgent(proxy);

    const response = await fetch('https://gifts2.tonnel.network/api/pageGifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://tonnel-gift.vercel.app',
        'Referer': 'https://tonnel-gift.vercel.app/'
      },
      body: JSON.stringify({
        page: 1,
        limit: 2,
        sort: JSON.stringify({ price: 1 }),
        filter: JSON.stringify(filter),
        ref: 0,
        price_range: null,
        user_auth: ""
      }),
    //   agent,
    });

    return await response.json();
  } catch (e) {
    // console.error(`Ошибка с прокси ${proxy}:`, e);
    return [];
  }
};
