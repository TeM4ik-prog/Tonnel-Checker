import { toast } from "react-toastify";
import { useGetUserRole } from "@/store/hooks";
import { useUserLoading } from "@/store/hooks";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
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