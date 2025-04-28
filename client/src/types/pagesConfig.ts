import { createAxiosInstance } from "@/api/axios.api"
import { GroupIcon, GlobeIcon, BuildingIcon, FlagIcon, BookIcon, PenIcon, PodcastIcon, LandmarkIcon, HomeIcon, UserCircle2, StarIcon, UserCog2Icon, RocketIcon, DramaIcon, SproutIcon, HeartIcon, Contact2Icon, FilterIcon, EyeOff } from "lucide-react";

export interface Route {
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

export let RoutesConfigMain: { [key: string]: Route } = {
    HOME: { path: '/', label: 'Главная', showInHeader: false, icon: HomeIcon },
    PROFILE: { path: '/profile', label: 'Личный кабинет', showInHeader: false, icon: UserCog2Icon },

    // __________


    FILTERS: {
        path: '/filters',
        label: 'Фильтры',
        shortLabel: 'Фильтры',
        showInHeader: false,
        icon: FilterIcon,
    },

    GIFT_MESSAGES: {
        path: '/hiddenMessages',
        label: 'скрытые сообщения',
        shortLabel: 'скрытые сообщения',
        showInHeader: false,
        icon: EyeOff,
    },





    // CONTACTS: {
    //     path: '/contacts',
    //     label: 'Контакты',
    //     shortLabel: 'Контакты',
    //     showInHeader: false,
    //     icon: Contact2Icon,

    // },

}



function updateRoutesWithParentPath(routes: Record<string, any>, parentPath = '') {
    return Object.entries(routes).reduce((acc, [key, value]) => {
        const newPath = parentPath + value.path;

        acc[key] = { ...value, path: newPath };
        if (value.subRoutes) {
            acc[key].subRoutes = updateRoutesWithParentPath(value.subRoutes, newPath);
        }

        return acc;
    }, {} as Record<string, any>);
}

export const RoutesConfig: { [key: string]: Route } = updateRoutesWithParentPath(RoutesConfigMain);

export const POSTS_PATHS = [

    // // 'CENTRE',
    // 'SPORTS_CLUB',
    // 'FLAGSHIP',
    // 'THEATRE',
    // 'POST_1',
    // 'MUSEUM',
    // 'GYMN_IMPROVING',


] as const



class ApiConfig {
    auth = {
        baseInstance: createAxiosInstance('auth/'),
        telegramInstance: createAxiosInstance('auth/telegram/'),

        profile: "profile",


        login: "login",



    }

    admin = {
        baseInstance: createAxiosInstance('admin/'),
        users: {
            main: "users",
            ban: "users/ban",
            passwordChange: "password/change",

        }


    }


    users = {
        baseInstance: createAxiosInstance('users/'),
        getGiftMessages: 'giftMessages',

    }

    gifts = {
        baseInstance: createAxiosInstance('gifts/'),

        lastUpdate: "last-update",
        giftModels: 'gift-models',
        applyFilters: 'apply-filters',
        userFilters: "filters",
        restoreGiftMessage: 'restore-gift-message'

    }

}


export const apiConfig = new ApiConfig()
export type RouteKey = keyof typeof RoutesConfig;

