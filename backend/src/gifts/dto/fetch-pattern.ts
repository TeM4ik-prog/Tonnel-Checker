export const fetchPattern = async (name: string, backdrop: string | null) => {
    try {
        const filter: {
            price: { $exists: boolean };
            refunded: { $ne: boolean };
            buyer: { $exists: boolean };
            export_at: { $exists: boolean };
            asset: string;
            gift_name: { $in: string[] };
            backdrop?: { $regex: string };
        } = {
            price: { $exists: true },
            refunded: { $ne: true },
            buyer: { $exists: false },
            export_at: { $exists: true },
            asset: "TON",
            gift_name: { $in: [name] },
        };

        if (backdrop) {
            filter.backdrop = { $regex: backdrop };
        }

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
            })
        });
        return await response.json();
    } catch (e) {
        console.error(e);
        return [];
    }
};