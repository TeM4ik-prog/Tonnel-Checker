import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class userService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.users.baseInstance;
        this.baseUrl = apiConfig.users;
    }

    async updateInfo(formData: any) {
        const { data } = await this.instance.patch('', formData)
        return data
    }
}


export const UserService = new userService()