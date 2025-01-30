import { UserRole } from "@/types";
import { useUserData } from "../store/hooks";

export const hasAccess = (allowedRoles: UserRole[]): boolean => {
    const { user } = useUserData()
    return allowedRoles.includes(user?.role as UserRole);
}