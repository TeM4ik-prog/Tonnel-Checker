import { Page } from 'puppeteer';

export const fetchProxyPattern = async (
  name: string,
  backdrop: string | null,
  model: string | null = null,
  pageCtx: Page
) => {
console.log('start fetch')

  try {
    const response = await pageCtx.evaluate(
      async (name, backdrop, model) => {
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

console.log(filter)

        // const controller = new AbortController();
        // const timeout = setTimeout(() => controller.abort(), 5000);

        try {
          const res = await fetch('https://gifts2.tonnel.network/api/pageGifts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Origin': 'https://tonnel-gift.vercel.app',
              'Referer': 'https://tonnel-gift.vercel.app/',
            },
            body: JSON.stringify({
              page: 1,
              limit: 2,
              sort: JSON.stringify({ price: 1 }),
              filter: JSON.stringify(filter),
              ref: 0,
              price_range: null,
              user_auth: "",
            }),
            // signal: controller.signal,
          });

          console.log(res)

        //   clearTimeout(timeout);

          const text = await res.text();

          try {
            return JSON.parse(text);
          } catch {
            if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
              return { error: 'Too many requests or HTML returned' };
            }
            throw new Error('Invalid JSON response');
          }
        } catch (err: any) {
            console.log(err)
        //   clearTimeout(timeout);
        //   if (err.name === 'AbortError') {
        //     return { error: 'Timeout' };
        //   }
        //   return { error: err.message || 'Unknown error' };
        }
      },
      name,
      backdrop,
      model,
    );

    if (response?.error) {
      console.error('❌ Ошибка на стороне evaluate:', response.error);
      return [];
    }

    return response;
  } catch (err) {
    console.error('❗ Ошибка при выполнении page.evaluate:', err);
    return [];
  }
};
