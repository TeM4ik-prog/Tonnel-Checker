import { apiConfig } from "@/types/pagesConfig";
import { ITelegramUser } from "@/types/auth";


class authService {
    private instance;
    private baseUrl;

    constructor() {
        this.instance = apiConfig.auth.baseInstance;
        this.baseUrl = apiConfig.auth;
    }


    async login(telegramData: ITelegramUser) {
        const { data } = await this.instance.post(this.baseUrl.login, telegramData)
        return data
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