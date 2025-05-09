import { IGiftMessage } from "./message";

export interface IGift {
    id: string;
    giftId: number;
    giftNum: number;
    name: string;
    price: number;
    model: string;
    symbol: string;
    backdrop: string;
    createdAt: Date;
    updatedAt: Date;
    giftsDataUpdateId: string | null;

    GiftDataUpdate?: IGiftDataUpdate
}


export interface IGiftDataUpdate {
    id: string;
    name: string;
    Gifts: IGift[];
    profit: number;
    sellPrice: number;

    filterLink?: string,
    message? : IGiftMessage,


    createdAt: Date;
    updatedAt: Date;
}


export interface GroupedUpdates {
    [name: string]: {
        items: IGiftDataUpdate[];
        itemFilters: IUserFilters;
        isExpanded: boolean;
    };
}


export interface IPackGiftsDataUpdate {
    id: string;
    Gifts: IGiftDataUpdate[];
    updatedAt: Date;
}


export interface IUserFilters {
    nft: string;
    models: string[];
    backgrounds: string[];
    symbols: string[]
}