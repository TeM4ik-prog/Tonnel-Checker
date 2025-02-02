import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class categoryService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.category.baseInstance;
        this.baseUrl = apiConfig.category;
    }

    async getCategories() {
        const { data } = await this.instance.get('')
        return data
    }
}


export const CategoryService = new categoryService()