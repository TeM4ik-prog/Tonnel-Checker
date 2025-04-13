import { ApiRoute } from "@/types";
import { ITelegramAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class TelegramAuthService implements ApiRoute {
    instance
    baseUrl

    constructor() {
        this.instance = apiConfig.auth.telegramInstance;
        this.baseUrl = apiConfig.auth.telegram;
    }


    async login(telegramData: ITelegramAuth) {
        const { data } = await this.instance.post(this.baseUrl.login, telegramData)
        return data
    }


}

