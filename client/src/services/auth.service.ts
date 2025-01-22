import { apiConfig } from "@/types/pagesConfig";
import { EmailAuthService } from "./auth/email.service"
import { GoogleAuthService } from "./auth/google.service";
import { TelegramAuthService } from "./auth/telegram.service"


class authService {
    private instance;
    private baseUrl;
    private emailService: EmailAuthService;
    private telegramService: TelegramAuthService;
    private googleService: GoogleAuthService;

    constructor() {
        this.instance = apiConfig.auth.baseInstance;
        this.emailService = new EmailAuthService();
        this.telegramService = new TelegramAuthService();
        this.googleService = new GoogleAuthService();

        this.baseUrl = apiConfig.auth;
    }

    get Email() {
        return this.emailService
    }

    get Telegram() {
        return this.telegramService
    }

    get Google() {
        return this.googleService
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