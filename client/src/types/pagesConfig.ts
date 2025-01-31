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
    HOME: { path: '/', label: '' },
    ENTRY: { path: '/entry', label: '' },

    // __________

    VICTORY_DAY: { path: '/victory-day', label: 'До лет Великой Победы' },

    LITERARY_IDEAL: { path: '/literary-ideal', label: 'Лит.-ист. идеал' },

    PATRIOTISM: { path: '/patriotism', label: 'Дискусионный клуб' },

    INTERNATIONAL_COOPERATION: { path: '/international-cooperation', label: 'Ассоциация школ РФ и РБ' },

    CENTRE: { path: '/centre', label: 'Медиацентр' },

    SPORTS_CLUB: { path: '/sports-club', label: 'Спортивный клуб' },

    FLAGSHIP: { path: '/flagship', label: 'Знамёнка' },

    THEATRE: { path: '/theatre', label: 'Театр' },

    POST_1: { path: '/post-1', label: 'Пост №1' },


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

