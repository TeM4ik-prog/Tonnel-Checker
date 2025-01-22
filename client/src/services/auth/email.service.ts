import { ApiRoute, userIdParam } from "@/types";
import { apiConfig } from "@/types/pagesConfig";

export class EmailAuthService implements ApiRoute {
     instance
     baseUrl

    constructor() {
        this.instance = apiConfig.auth.emailInstance;
        this.baseUrl = apiConfig.auth.email;
    }


    async login(email: string) {
        const { data } = await this.instance.post(this.baseUrl.login, { email })
        return data;
    }

    async loginAdmin(email: string, password: string) {
        const { data } = await this.instance.post(this.baseUrl.loginAdmin, { email, password })
        return data;
    }

    async sendCode(email: string) {
        const { data } = await this.instance.post(this.baseUrl.sendCode, { email })
        return data;
    }

    async register(userData: any) {
        const { data } = await this.instance.post(this.baseUrl.register, userData)
        return data;
    }

    async recovery(email: string) {
        const { data } = await this.instance.post(this.baseUrl.recovery, { email })
        return data;
    }

    async changePassword(changeData: any) {
        const { data } = await this.instance.patch(this.baseUrl.changePassword, changeData)
        return data;
    }

    async verifyCode(userId: string, code: string) {
        const { data } = await this.instance.post(this.baseUrl.verifyCode, { code, userId })
        return data;
    }

    
}
