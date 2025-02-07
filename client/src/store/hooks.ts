import { useSelector } from 'react-redux';
import { RootState } from './store';
import { UserState } from '@/types/states';
import { Category, UserRole } from '@/types';
import { Route, RouteKey, RoutesConfig } from '@/types/pagesConfig';


export const useAuth = () => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth)
    return isAuth
}

export const useUserData = (): UserState => {
    const user = useSelector((state: RootState) => state.user)
    return user
}

export const useUserLoading = () => {
    const isLoading = useSelector((state: RootState) => state.user.isLoading)
    return isLoading
}

export const useUpdateUserTrigger = () => {
    const userTrigger = useSelector((state: RootState) => state.user.updateTrigger)
    return userTrigger
}

export const useGetUserRole = () => {
    const role = useSelector((state: RootState) => state.user.user?.role)
    return role
};

// __________


export const useCategories = (): { categories: Route[], categoriesNames: string[], categoriesIds: string[] } => {
    try {
        const categories = useSelector((state: RootState) => state.categoriesSlice.categories)
        if (!categories.length) return { categories: [], categoriesNames: [], categoriesIds: [] }

        const categoriesNamesEn = categories.map((category) => category.name) || []
        const categoriesNamesRu: string[] = []
        const categoriesResult: Route[] = []

        for (let i = 0; i < categoriesNamesEn.length; i++) {
            const element = categoriesNamesEn[i]

            for (const key in RoutesConfig) {
                const route = RoutesConfig[key]

                if ('/' + element == route.path) {
                    categoriesNamesRu.push(route.label)
                    categoriesResult.push(route)
                }
            }
        }

        console.log(categoriesResult)



        const categoriesIds = categories.map((category) => category.id) || []
        return { categories: categoriesResult, categoriesNames: categoriesNamesRu, categoriesIds }
    } catch (err) {
        console.log(err)
        return { categories: [], categoriesNames: [], categoriesIds: [] }

    }


}




