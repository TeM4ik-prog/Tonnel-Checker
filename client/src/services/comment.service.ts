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

    async getComments(){
        const { data } = await this.instance.get('')
        return data
    }

    async getMyComments() {
        const { data } = await this.instance.get(this.baseUrl.myComments)
        return data
    }

    
 

    async postComment(reviewData: any) {
        const { data } = await this.instance.post('', reviewData)
        return data
        
    }

    async updateComment(commentId: string, formData: any) {
        const { data } = await this.instance.patch(`/${commentId}`, formData)
        return data
    }

    async deleteComment(id: string) {
        const { data } = await this.instance.delete(`/${id}`)
        return data
    }

    // _____________


    async deleteMyComment(id: string) {
        const { data } = await this.instance.delete(`/me/${id}`)
        return data
    }


    
}





export const CommentService = new commentService()