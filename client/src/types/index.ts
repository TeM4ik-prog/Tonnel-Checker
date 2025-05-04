import { handleError } from "@/utils/handleError";
import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const TelegramBot: string = "tonnel_ckecker_bot"

export type userIdParam = number | string


export enum UserRoles {
    Admin = 'ADMIN',
    User = 'USER',
    SuperAdmin = 'SUPER_ADMIN',
}


export enum RequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}


export interface TelegramLoginButtonType {
    botName: string;
    usePic: boolean;
    className?: string;
    cornerRadius?: number;
    requestAccess?: boolean;
    wrapperProps?: any;
    dataOnauth?: (res: any) => void;
    dataAuthUrl?: string;
    buttonSize: "large" | "medium" | "small";
}


export interface ApiRoute {
    instance: AxiosInstance,
    baseUrl: Object
}


export async function onRequest<T>(request: Promise<T>): Promise<T | null> {
    try {
        return await request;
    } catch (err: any) {
        console.log(err)
        // handleError(err);
        // const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
        toast.error(err.response.data.message);
        return null
    }
}





