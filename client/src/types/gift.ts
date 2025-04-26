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
}


export interface IGiftDataUpdate {
    id: string;
    name: string;
    Gifts: IGift[];
    profit: number;
    sellPrice: number;

    tonnelLink?: string


    createdAt: Date;
    updatedAt: Date;
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