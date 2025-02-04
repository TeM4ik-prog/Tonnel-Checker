import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class commentService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.comment.baseInstance;
        this.baseUrl = apiConfig.comment;
    }

    async getComments() {
        const { data } = await this.instance.get('')
        return data
    }
 

    async postComment(reviewData: any) {
        const { data } = await this.instance.post('', reviewData)
        return data
    }

    async deleteComment(id: string) {
        const { data } = await this.instance.delete(id)
        return data
    }

    // _____________
}


export const CommentService = new commentService()