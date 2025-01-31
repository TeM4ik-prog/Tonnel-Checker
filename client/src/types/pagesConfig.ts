import { createAxiosInstance } from "@/api/axios.api"
import { GroupIcon, GlobeIcon, BuildingIcon, FlagIcon, BookIcon, PenIcon, PodcastIcon, LandmarkIcon, HomeIcon } from "lucide-react";

interface Route {
    path: string;
    label: string;
    shortLabel?: string;
    showInHeader?: boolean;
    icon?: React.ElementType;
    subRoutes?: { [key: string]: Route };
}


export interface Routes {
    [key: string]: Route;
}

export const RoutesConfig: { [key: string]: Route } = {
    HOME: { path: '/', label: 'Главная', showInHeader: false, icon: HomeIcon },

    // __________

    VICTORY_DAY: {
        path: '/victory-day',
        label: 'До лет Великой Победы',
        shortLabel: 'Победа',
        showInHeader: true,
        icon: BookIcon
    },

    LITERARY_IDEAL: {
        path: '/literary-ideal',
        label: 'Лит.-ист. идеал',
        shortLabel: 'Литература',
        showInHeader: true,
        icon: PenIcon
    },

    PATRIOTISM: {
        path: '/patriotism',
        label: 'Дискуссионный клуб',
        shortLabel: 'Дискуссии',
        showInHeader: true,
        icon: GroupIcon
    },

    INTERNATIONAL_COOPERATION: {
        path: '/international-cooperation',
        label: 'Ассоциация школ РФ и РБ',
        shortLabel: 'Сотрудничество',
        showInHeader: true,
        icon: GlobeIcon
    },

    CENTRE: {
        path: '/centre',
        label: 'Медиацентр',
        shortLabel: 'Медиа',
        showInHeader: true,
        icon: BuildingIcon
    },

    SPORTS_CLUB: {
        path: '/sports-club',
        label: 'Спортивный клуб',
        shortLabel: 'Спорт',
        showInHeader: true,
        icon: LandmarkIcon
    },

    FLAGSHIP: {
        path: '/flagship',
        label: 'Знамёнка',
        shortLabel: 'Знамёнка',
        showInHeader: true,
        icon: FlagIcon
    },

    THEATRE: {
        path: '/theatre',
        label: 'Театр',
        shortLabel: 'Театр',
        showInHeader: true,
        icon: LandmarkIcon
    },

    POST_1: {
        path: '/post-1',
        label: 'Пост №1',
        shortLabel: 'Пост №1',
        showInHeader: true,
        icon: PodcastIcon
    },


    ENTRY: { path: '/entry', label: '', showInHeader: false },
    POSTS: { path: '/posts', label: '', showInHeader: false },

    
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
export type RouteKey = keyof typeof RoutesConfig;

