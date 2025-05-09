import { ApiRoute } from "@/types";
import { apiConfig } from "@/types/pagesConfig";

export class filtersService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.filters.baseInstance;
        this.baseUrl = apiConfig.filters;
    }

    async getUserFilters(){
        const { data } = await this.instance.get('')
        return data;
    }

    async applyFilters(filters: any) {
        const { data } = await this.instance.post(this.baseUrl.applyFilters, filters)
        return data
    }

    
}


export const FiltersService = new filtersService()