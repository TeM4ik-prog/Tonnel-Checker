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
        const userData = localStorage.getItem('userData')
        if(!userData) return null
        const telegramId = JSON.parse(userData).id


        const { data } = await this.instance.get(`${this.baseUrl.lastUpdate}/${telegramId}`)
        return data
    }


    async getGiftModels() {
        const userData = localStorage.getItem('userData')
        if(!userData) return null
        const telegramId = JSON.parse(userData).id

        const { data } = await this.instance.get(`${this.baseUrl.giftModels}/${telegramId}`)
        return data
    }


    async applyFilters(filters: any) {
        const { data } = await this.instance.post(this.baseUrl.applyFilters, filters)
        return data
    }


    async getUserFilters() {
        const userData = localStorage.getItem('userData')
        if(!userData) return null
        const telegramId = JSON.parse(userData).id

        const { data } = await this.instance.get(`${this.baseUrl.userFilters}/${telegramId}`)
        return data
    }
}


export const GiftService = new giftService()