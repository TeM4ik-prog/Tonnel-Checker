import { apiConfig } from "@/types/pagesConfig";
import { TelegramAuthService } from "./auth/telegram.service"


class authService {
    private instance;
    private baseUrl;
    private telegramService: TelegramAuthService;

    constructor() {
        this.instance = apiConfig.auth.baseInstance;
        this.telegramService = new TelegramAuthService();

        this.baseUrl = apiConfig.auth;
    }


    get Telegram() {
        return this.telegramService
    }



    async getProfile() {
        try {
            const { data } = await this.instance.get(this.baseUrl.profile)
            return data;
        } catch (error) {
            return null;
        }
    }

}


export const AuthService = new authService()