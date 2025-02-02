import { handleError } from "@/utils/handleError";
import { AxiosInstance } from "axios";

export const TelegramBot: string = "TgVerifyApp_bot"

export interface IUser {
    id: number;
    role?: UserRole;
    banned?: boolean;

    EmailUser: {
        id: number;
        email: string;
    }

    TelegramUser: {
        authDate: string; 
        firstName: string;
        photoUrl: string;
        telegramId: string; 
        username: string;
    }

    GoogleUser:{
        id: number;
        email: string;
        name: string;
        givenName: string;
        photoUrl: string;

    }
}


export type userIdParam = number | string


export enum UserRole {
    Admin = 'admin',
    User = 'user',
    SuperAdmin ='superAdmin',
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

export interface Category {
    id: string;
    name: string;
}






export async function onRequest<T>(request: Promise<T>): Promise<T | null> {
    try {
        return await request;
    } catch (err) {
        handleError(err);
        return null;
    }
}





