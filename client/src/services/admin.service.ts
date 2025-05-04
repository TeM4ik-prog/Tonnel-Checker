import { ApiRoute, RequestStatus } from "@/types";
import { apiConfig } from "@/types/pagesConfig";


export class adminService implements ApiRoute {
    instance
    baseUrl

    constructor() {
        this.instance = apiConfig.admin.baseInstance;
        this.baseUrl = apiConfig.admin;
    }


    async getUsers(params: any) {
        // /?query=${JSON.stringify(params)}
        const { data } = await this.instance.get(`${this.baseUrl.users.main}`)
        return data
    }

    async getUserDetailedInfo(id: string) {
        const { data } = await this.instance.get(`${this.baseUrl.users.main}/${id}`)
        return data
    }

    async switchBanUser(id: number) {
        const { data } = await this.instance.patch(`${this.baseUrl.users.ban}/${id}`)
        return data
    }

    async updateUserRights(telegramId: number, hasRights?: boolean) {
        const { data } = await this.instance.patch(`${this.baseUrl.users.updateRights}`, { telegramId, hasRights })
        return data
    }

    async changeUserPassword(id: number, password: string) {
        const { data } = await this.instance.patch(`${this.baseUrl.users.passwordChange}/${id}/${password}`)
        return data
    }


    async getAccessRequestsByStatus(status: RequestStatus) {
        const { data } = await this.instance.get(`${this.baseUrl.users.accessRequests}/${status}`)
        return data
    }

    async approveAccessRequest(id: string) {
        const { data } = await this.instance.patch(`${this.baseUrl.users.accessRequests}/approve/${id}`)
        return data
    }   

    async rejectAccessRequest(id: string) {
        const { data } = await this.instance.patch(`${this.baseUrl.users.accessRequests}/reject/${id}`)
        return data
    }
    
    
}



export const 

AdminService = new adminService()