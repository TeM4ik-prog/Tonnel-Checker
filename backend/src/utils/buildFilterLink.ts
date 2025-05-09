import { CreateGiftDto } from "@/gifts/dto/create-gift.dto";
import { Prisma } from "@prisma/client";
interface IUserFilters {
    nft: string;
    models: string[];
    backgrounds: string[];
    symbols: string[]
}


export const buildLink = (filterItem: any, gift: CreateGiftDto) => {

    // console.log('filterItem', filterItem)

    // console.log("gift", gift)


    const model = gift.model
    const background = gift.backdrop
    const symbol = gift.symbol

    const models =  filterItem.models 
    const backgrounds = filterItem.backgrounds
    const symbols = filterItem.symbols

    // console.log(models)
    // console.log(backgrounds)
    // console.log(symbols)




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

    // console.log(`https://t.me/tonnel_network_bot/gifts?startapp=${encoded}`)
    return `https://t.me/tonnel_network_bot/gifts?startapp=${encoded}`;
};