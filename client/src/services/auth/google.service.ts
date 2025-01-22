import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class GoogleAuthService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.auth.googleInstance;
        this.baseUrl = apiConfig.auth.google;
    }

    async login(googleData: IGoogleAuth) {
        const { data } = await this.instance.post(this.baseUrl.login, googleData)
        return data
    }
}