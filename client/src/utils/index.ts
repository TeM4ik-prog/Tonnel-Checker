import { RoutesConfig } from "@/types/pagesConfig";

export const findCategoryByPath = (category?: string) => {
    if(!category) return
    
    return Object.values(RoutesConfig).find(route => route.path === `/${category}`) || null

}
