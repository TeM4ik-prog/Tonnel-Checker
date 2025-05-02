import { GroupedUpdates, IGift, IGiftDataUpdate, IUserFilters } from "@/types/gift";

export const getProfitColor = (profit: number) => {
    if (profit > 0) return 'text-green-500';
    if (profit < 0) return 'text-red-500';
    return 'text-gray-500';
};

export const groupGiftUpdates = (updates: IGiftDataUpdate[], userFilters: IUserFilters[]) => {
    const grouped: GroupedUpdates = {};

    const buildLink = (filterItem: IUserFilters, gift: IGift,) => {
        const model = gift.model
        const background = gift.backdrop
        const symbol = gift.symbol

        const assembled = [
            "filter",
            "",
            JSON.stringify([filterItem.nft]),
            JSON.stringify(filterItem.models.includes(model) ? [`${filterItem.nft}_${model}`] : []),
            JSON.stringify(filterItem.backgrounds.includes(background) ? [background] : []),
            JSON.stringify(filterItem.symbols.includes(symbol) ? [symbol] : []),
            'TON',
            JSON.stringify(["", ""])
        ].join(";") + ";";

        const encoded = btoa(unescape(encodeURIComponent(assembled)));
        return `https://t.me/tonnel_network_bot/gifts?startapp=${encoded}`;
    };

    updates.forEach((update: IGiftDataUpdate) => {
        const gift = update.Gifts[0]


        const name = update.Gifts[0]?.name || 'Unknown';


        const filterItem: IUserFilters | undefined = (userFilters.find((filter) => (name === filter.nft)));
        console.log(filterItem)


        if (!filterItem) return


        if (!grouped[name]) {
            grouped[name] = {
                items: [],
                itemFilters: filterItem!,
                isExpanded: false
            };
        }

        update.tonnelLink = buildLink(filterItem, gift);
        grouped[name].items.push(update);
    });

    return grouped;
};