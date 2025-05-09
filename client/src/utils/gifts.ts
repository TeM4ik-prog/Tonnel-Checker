import { GroupedUpdates, IGift, IGiftDataUpdate, IUserFilters } from "@/types/gift";

export const getProfitColor = (profit: number) => {
    if (profit > 0) return 'text-green-500';
    if (profit < 0) return 'text-red-500';
    return 'text-gray-500';
};

export const groupGiftUpdates = (updates: IGiftDataUpdate[], userFilters: IUserFilters[]) => {
    const grouped: GroupedUpdates = {};

    updates.forEach((update: IGiftDataUpdate) => {
        const gift = update.Gifts[0]

        const name = update.Gifts[0]?.name || 'Unknown';
        const filterItem: IUserFilters | undefined = (userFilters.find((filter) => (name === filter.nft)));

        if (!filterItem) {
            console.log('no filter item')
            return
        }

        if (!grouped[name]) {
            grouped[name] = {
                items: [],
                itemFilters: filterItem!,
                isExpanded: false
            };
        }

        grouped[name].items.push(update);
    });

    return grouped;
};