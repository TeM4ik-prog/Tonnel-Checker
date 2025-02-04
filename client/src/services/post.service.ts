import { ApiRoute } from "@/types";
import { IGoogleAuth } from "@/types/auth";
import { apiConfig } from "@/types/pagesConfig";

export class postService implements ApiRoute {
    instance;
    baseUrl;

    constructor() {
        this.instance = apiConfig.post.baseInstance;
        this.baseUrl = apiConfig.post;
    }

    async getPosts(category: string) {
        const { data } = await this.instance.get(`/${category}`)
        return data
    }

    async createPost(postData: any) {
        const { data } = await this.instance.post('', postData)
        return data
    }

    async updatePost(postId: string, postData: any) {
        const { data } = await this.instance.patch(`/${postId}`, postData)
        return data
    }


    async deletePost(id: string) {
        const { data } = await this.instance.delete(`/${id}`)
        return data
    }
}

export const PostService = new postService()