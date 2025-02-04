import { createAxiosInstance } from "@/api/axios.api"
import { GroupIcon, GlobeIcon, BuildingIcon, FlagIcon, BookIcon, PenIcon, PodcastIcon, LandmarkIcon, HomeIcon, UserCircle2, StarIcon, UserCog2Icon, RocketIcon, DramaIcon, SproutIcon } from "lucide-react";

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

    VICTORY_DAY: {
        path: '/victory-day',
        label: '80 лет Великой Победы',
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
        icon: RocketIcon
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
        icon: DramaIcon,
        // subRoutes: {
        //     POST_1: {
        //         path: '/post-1',
        //         label: 'Пост ��1',
        //         shortLabel: 'Пост ��1',
        //         showInHeader: true,
        //         icon: PodcastIcon,
        //     }
        // }
    },

    POST_1: {
        path: '/post-1',
        label: 'Пост №1',
        shortLabel: 'Пост №1',
        showInHeader: true,
        icon: PodcastIcon
    },

    MUSEUM: {
        path: '/museum',
        label: 'Музей',
        shortLabel: 'музей',
        showInHeader: true,
        icon: LandmarkIcon
    },

    GYMN_IMPROVING: {
        path: '/gymn-improving',
        label: 'Благоустраиваем гимназию',
        shortLabel: 'Благоустройство',
        showInHeader: true,
        icon: SproutIcon

    },


    ENTRY: { path: '/entry', label: '', showInHeader: false },
    POSTS: { path: '/posts', label: '', showInHeader: false },

    INTERVIEWS: { path: '/interviews', label: 'Интервью учащихся', icon: StarIcon, showInHeader: false },

    CREATE_POSTS: { path: '/posts-reviews/create', icon: UserCircle2, label: 'создание постов и интерью', showInHeader: false },


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
    'VICTORY_DAY',
    'LITERARY_IDEAL',
    'PATRIOTISM',
    'INTERNATIONAL_COOPERATION',
    'CENTRE',
    'SPORTS_CLUB',
    'FLAGSHIP',
    'THEATRE',
    'POST_1',
    'MUSEUM',
    'GYMN_IMPROVING'


] as const
















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

    post = {
        baseInstance: createAxiosInstance('post/'),

    }

    category = {
        baseInstance: createAxiosInstance('category/'),
    }

    review = {
        baseInstance: createAxiosInstance('review/'),
    }

}


export const apiConfig = new ApiConfig()
export type RouteKey = keyof typeof RoutesConfig;

