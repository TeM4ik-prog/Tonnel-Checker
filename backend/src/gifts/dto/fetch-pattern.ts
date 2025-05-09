
// _____________________
export const fetchPattern = async (
  name: string,
  backdrop: string | null,
  model: string | null = null,
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

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

    const response = await fetch('https://gifts2.tonnel.network/api/pageGifts', {
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
        user_auth: ""
      }),
      signal: controller.signal,
      // agent,
    });

    clearTimeout(timeout);

    const text = await response.text(); 

    try {
      return JSON.parse(text); 
    } catch (jsonError) {

      // console.log(text)
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        console.error('❌ Слишком много запросов, fetch отклонен:');
        return [];
      }
      throw jsonError;
    }

  } catch (e: any) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      console.error('⏱️ Тайм-аут запроса');
    } else {
      console.error('❗ Ошибка при fetch:', e);
    }
    return [];
  }
};
