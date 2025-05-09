import { Header } from '@/components/layout/Header';
import { RoutesConfig } from '@/types/pagesConfig';
import { createContext, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccessRequests } from './components/admin/accessRequests';
import { MainAdmin } from './components/admin/main';
import { UsersShow } from './components/admin/usersShow';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminPage } from './pages/AdminPage';
import FiltersPage from './pages/FiltersPage';
import { GiftMessagesPage } from './pages/GiftMessagesPage';
import MainPage from './pages/MainPage';
import { NoRightsPage } from './pages/NoRightsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthService } from './services/auth.service';
import { useUserData } from './store/hooks';
import { login, logout } from './store/user/user.slice';
import { onRequest, UserRoles } from './types';
import { ITelegramUser, IUser } from './types/auth';
import { setTokenToLocalStorage } from './utils/localstorage';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));


declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user?: ITelegramUser;
        };
        sendData: (data: string) => void;
        close: () => void;
        onEvent: (event: string, handler: () => void) => void;
        offEvent: (event: string, handler: () => void) => void;
        isExpanded?: boolean;
        expand: () => void;
        ready: () => void;
      };
    };
  }
}


const RestoreGiftUpdateContext = createContext<boolean>(false);



function App() {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {

      const fnCheckAuth = async () => {
        if (import.meta.env.DEV) {
          const mockData = {
            "id": 2027571609,
            "first_name": "Artem",
            "last_name": "",
            "username": "TeM4ik20",
            "language_code": "ru",
            "is_premium": true,
            "allows_write_to_pm": true,
            "photo_url": "https://t.me/i/userpic/320/kf7ulebcULGdGk8Fpe4W3PkcpX2DxWO1rIHZdwT60vM.svg"
          }

          const data: { token: string, user: IUser } = await onRequest(AuthService.login(mockData));

          console.log(data.user)

          if (data?.user?.hasAccess) {
            setTokenToLocalStorage(data.token);
            dispatch(login(data.user));
          } else {
            dispatch(logout());
          }

          
        }
        else {
          if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            const newUserData = window.Telegram.WebApp.initDataUnsafe.user

            const data: { token: string, user: IUser } = await onRequest(AuthService.login(newUserData))
            console.log(data.user)

            setTokenToLocalStorage(data.token)

  
            if (data?.user?.hasAccess) {
              dispatch(login(data.user))
            } else {
              dispatch(logout())
            }
          }
          else {
            toast.warning('no telegram data')
            dispatch(logout())
          }


        }


      }

      fnCheckAuth()

    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
      dispatch(logout());
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className='flex flex-1 flex-col bg-gray-800 items-start'>
      <Router>
        <RestoreGiftUpdateContext.Provider value={false}>
          <Header />
          <main className='w-full min-h-screen z-[0]'>
            <Routes>
              <Route path={RoutesConfig.NO_RIGHTS.path} element={<NoRightsPage />} />
              <Route path="*" element={<ProtectedRoutes />} />
            </Routes>
          </main>
          <Footer />
        </RestoreGiftUpdateContext.Provider>
      </Router>
    </div>
  );
}

const ProtectedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useUserData()

  useEffect(() => {
    if (!isLoading && !user?.hasAccess && location.pathname !== RoutesConfig.NO_RIGHTS.path) {
      navigate(RoutesConfig.NO_RIGHTS.path);
    }
  }, [user, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return null;
  }

  if (!user?.hasAccess) return <NoRightsPage />



  return (
    <Routes>
      <Route path={RoutesConfig.ADMIN.path + "/*"} element={
        <ProtectedRoute allowedRoles={[UserRoles.Admin]}>
          <AdminPage />
        </ProtectedRoute>
      }>
        <Route index element={<MainAdmin />} />
        <Route path="users" element={<UsersShow />} />
        <Route path="access-requests" element={<AccessRequests />} />
      </Route>


      <Route path={RoutesConfig.HOME.path} element={<MainPage />} />
      <Route path={RoutesConfig.FILTERS.path} element={<FiltersPage />} />


      <Route path={RoutesConfig.GIFT_MESSAGES.path} element={
        <RestoreGiftUpdateContext.Provider value={true}>
          <GiftMessagesPage />
        </RestoreGiftUpdateContext.Provider>
      } />

      <Route path={RoutesConfig.PROFILE.path} element={<ProfilePage />} />


      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export { App, RestoreGiftUpdateContext };
