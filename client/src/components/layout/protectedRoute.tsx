import { useGetUserRole, useUserLoading } from "@/store/hooks";
import { UserRole } from "@/types";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
    const userRole = useGetUserRole();
    const isLoading = useUserLoading()

    if (isLoading) {
        return
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        toast.error('You have no rights');
        return <Navigate to="/" replace />;
    }

    return children;
}