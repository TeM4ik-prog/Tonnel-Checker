import { ApiRoute } from "@/types";
import { apiConfig } from "@/types/pagesConfig";

export class giftService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.gifts.baseInstance;
        this.baseUrl = apiConfig.gifts;
    }

    async getLastUpdate() {
        const { data } = await this.instance.get(this.baseUrl.lastUpdate)
        return data
    }
}


export const GiftService = new giftService()