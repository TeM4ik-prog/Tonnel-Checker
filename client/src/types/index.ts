import { handleError } from "@/utils/handleError";
import { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const TelegramBot: string = "tonnel_ckecker_bot"

export interface IUser {
    id: string;
    role?: UserRole;
    banned?: boolean;
    name: string;

    
    TelegramUser: {
        authDate: string;
        firstName: string;
        photoUrl: string;
        telegramId: string;
        username: string;
    } | null
}




export type userIdParam = number | string


export enum UserRole {
    Admin = 'admin',
    User = 'user',
    SuperAdmin = 'superAdmin',
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
    } catch (err) {
        handleError(err);
        const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
        toast.error(errorMessage);
        return null
    }
}





