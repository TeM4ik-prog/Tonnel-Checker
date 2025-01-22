import { createAxiosInstance } from "@/api/axios.api"

interface SubRoute {
    path: string;
    label: string;
}

export interface RouteWithSubRoutes {
    // path: string;
    // label: string;
    // subRoutes: { [key: string]: SubRoute };
}

interface RouteWithoutSubRoutes {
    path: string;
    label: string;
    subRoutes?: { [key: string]: SubRoute };
}

type Route = RouteWithoutSubRoutes;

export interface Routes {
    [key: string]: Route;
}

export const RoutesConfig: { [key: string]: Route } = {
    HOME: { path: '/', label: 'Главная' },
    ACHIEVEMENTS: { path: '/achievements', label: 'Достижения современной Беларуси' },
    HISTORY: { path: '/history', label: 'Истории гимназии' },
    PATRIOTISM: { path: '/patriotism', label: 'Воспитание патриотов' },
    ANNOUNCEMENTS: {
        path: '/announcements',
        label: 'Анонс мероприятий',
        subRoutes: {
            ANNOUNCEMENTS_NEWS: { path: '/announcements/news', label: 'Новости' },
            ANNOUNCEMENTS_EVENTS: { path: '/announcements/events', label: 'События' },
        },
    },
    INTERNATIONAL_COOPERATION: { path: '/international-cooperation', label: 'Международное сотрудничество' },
    CONTACTS: { path: '/contacts', label: 'Контакты' },
    ENTRY: { path: '/entry', label: '' },
};




class ApiConfig {
    auth = {
        baseInstance: createAxiosInstance('auth/'),
        emailInstance: createAxiosInstance('auth/email/'),
        telegramInstance: createAxiosInstance('auth/telegram/'),
        googleInstance: createAxiosInstance('auth/google/'),

        profile: "profile",

        email: {
            register: "register",
            login: "login",
            loginAdmin: "login/admin",
            verifyCode: "verify",
            sendCode: "sendCode",
            recovery: "recovery",
            changePassword: "changePassword",
        },

        telegram: {
            login: "login",
        },

        vk: {
            login: "login",
        },

        google: {
            login: 'login'
        }
    }


    admin = {
        baseInstance: createAxiosInstance('admin/'),
        users: {
            main: "users",
            ban: "users/ban",
            passwordChange: "password/change",
        }
    }

}


export const apiConfig = new ApiConfig()

