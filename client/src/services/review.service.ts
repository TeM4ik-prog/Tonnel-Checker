import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class reviewService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.review.baseInstance;
        this.baseUrl = apiConfig.review;
    }

    async postReview(reviewData: any) {
        const { data } = await this.instance.post('', reviewData)
        return data
    }
}


export const ReviewService = new reviewService()