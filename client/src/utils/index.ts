import { RoutesConfig } from "@/types/pagesConfig";

export const findCategoryByPath = (category?: string) => {
    if (!category) return

    return Object.values(RoutesConfig).find(route => route.path === `/${category}`) || null

}



export const returnObjectFromForm = (e: React.FormEvent) => {
    const formDataUpdate = new FormData(e.target as HTMLFormElement)

    return Object.fromEntries(formDataUpdate.entries());
}