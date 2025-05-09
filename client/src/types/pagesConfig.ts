import { createAxiosInstance } from "@/api/axios.api";
import { EyeOff, FilterIcon, HomeIcon, UserCog2Icon, UserIcon, UserPlusIcon } from "lucide-react";

export type Route = {
    path: string;
    label: string;
    shortLabel?: string;
    showInHeader?: boolean;
    icon?: React.ElementType;
    disabled?: boolean;
    subRoutes?: { [key: string]: Route };
    admin?: boolean;
}

export const defaultRoute: Partial<Route> = {
    showInHeader: false,
    disabled: false,
    admin: false
}

export interface Routes {
    [key: string]: Route;
}

export let RoutesConfigMain: { [key: string]: Route } = {
    HOME: { path: '/', label: 'Главная', showInHeader: false, icon: HomeIcon },
    PROFILE: { path: '/profile', label: 'Личный кабинет', showInHeader: false, icon: UserCog2Icon },

    // __________

    ADMIN: {
        path: '/admin',
        label: 'Админка',
        showInHeader: false,
        icon: UserCog2Icon,
        admin: true,

        subRoutes: {
            // MAIN: {
            //     path: '/',
            //     label: 'Главная',
            //     showInHeader: false,
            //     icon: HomeIcon
            // },
            USERS: {
                path: '/users',
                label: 'Пользователи',
                showInHeader: false,
                icon: UserIcon
            },
            ACCESS_REQUESTS: {
                path: '/access-requests',
                label: 'Запросы на доступ',
                showInHeader: false,
                icon: UserPlusIcon
            }
        }
    },

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


    NO_RIGHTS: {
        path: '/no-rights',
        label: 'Нет прав',
        shortLabel: 'Нет прав',
        showInHeader: false,
        disabled: true,
        icon: UserIcon,
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
            updateRights: "users/update-rights",
            accessRequests: "users/access-requests",

        }


    }


    users = {
        baseInstance: createAxiosInstance('users/'),
        getGiftMessages: 'giftMessages',

        filters:{
            getFilters: 'filters'
        }

    }

    filters= {
        baseInstance: createAxiosInstance('filters/'),

        applyFilters: 'apply-filters',

    }

    gifts = {
        baseInstance: createAxiosInstance('gifts/'),
        lastUpdate: "last-update",
        giftModels: 'gift-models',
        restoreGiftMessage: 'restore-gift-message'

    }

}


export const apiConfig = new ApiConfig()
export type RouteKey = keyof typeof RoutesConfig;

