import { PageContainer } from "@/components/layout/PageContainer";
import { RoutesConfig } from "@/types/pagesConfig";
import { Outlet } from "react-router-dom";

export const AdminPage: React.FC = () => {
  // const { user } = useUserData()

  console.log(RoutesConfig.ADMIN.subRoutes!.USERS!.path)

  return (
    <PageContainer className="h-full" title="Admin Page">
        {/* <div className="admin-page__header">
          <h2 className='admin-page__title'>Admin Page</h2>
        </div> */}
        
        <Outlet />
    </PageContainer>
  )
}
