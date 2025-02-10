import { POSTS_PATHS, RoutesConfig } from "@/types/pagesConfig";

export const findCategoryByPath = (category?: string) => {
    if (!category) return

    return Object.values(RoutesConfig).find(route => route.path === `/${category}`) || null

}


export const isPostRoute = (routeKey: keyof typeof RoutesConfig) => {
    const finedRoute = POSTS_PATHS.find(route => route == routeKey)
    return finedRoute ? RoutesConfig.POSTS.path : ''
}



export const returnObjectFromForm = (e: React.FormEvent) => {
    const formDataUpdate = new FormData(e.target as HTMLFormElement)

    return Object.fromEntries(formDataUpdate.entries());
}