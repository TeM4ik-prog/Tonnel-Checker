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

    async getReviews() {
        const { data } = await this.instance.get('')
        return data
    }

    async getNewspapers() {
        const { data } = await this.instance.get(this.baseUrl.newspapers)
        return data
    }

    


    async postReview(reviewData: any) {
        const { data } = await this.instance.post('', reviewData)
        return data
    }

    async updateReview(reviewId: string, formData: any) {
        const { data } = await this.instance.patch(`/${reviewId}`, formData)
        return data
    }

    async deleteReview(id: string) {
        const { data } = await this.instance.delete(`/${id}`)
        return data
    }
}


export const ReviewService = new reviewService()