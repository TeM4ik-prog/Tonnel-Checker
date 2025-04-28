import { ApiRoute } from "@/types";
import { IUserFilters } from "@/types/gift";
import { apiConfig } from "@/types/pagesConfig";

export class giftService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.gifts.baseInstance;
        this.baseUrl = apiConfig.gifts;
    }

    async getLastUpdate() {
        const { data } = await this.instance.get(`${this.baseUrl.lastUpdate}`)
        return data
    }


    async getGiftModels() {
        const { data } = await this.instance.get(`${this.baseUrl.giftModels}`)
        return data
    }


    async applyFilters(filters: any) {
        const { data } = await this.instance.post(this.baseUrl.applyFilters, filters)
        return data
    }


    async getUserFilters() {
        const { data } = await this.instance.get(`${this.baseUrl.userFilters}`)
        return data
    }

    async restoreUserGiftMessage(messageId: number, chatId: number) {
        const { data } = await this.instance.patch(this.baseUrl.restoreGiftMessage, { messageId, chatId })
        return data;
    }
}


export const GiftService = new giftService()