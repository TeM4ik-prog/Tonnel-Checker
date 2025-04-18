import { Header } from '@/components/layout/Header';
import { RoutesConfig } from '@/types/pagesConfig';
import { lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FiltersPage from './pages/FiltersPage';
import MainPage from './pages/MainPage';
import { onRequest } from './types';
import { AuthService } from './services/auth.service';
import { ITelegramUser, IUser } from './types/auth';
import { useDispatch } from 'react-redux';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from './utils/localstorage';
import { login, logout } from './store/user/user.slice';

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

function App() {
  const dispatch = useDispatch()
  // const trigger = useUpdateUserTrigger()

  const [userData, setUserData] = useState<any>(null);

  const checkAuth = async () => {

    // dispatch(setLoading(true))
    try {
      // const savedUserData = getTokenFromLocalStorage()

      // const mockData = { "id": 2027571609, "first_name": "Artem", "last_name": "", "username": "TeM4ik20", "language_code": "ru", "is_premium": true, "allows_write_to_pm": true, "photo_url": "https://t.me/i/userpic/320/kf7ulebcULGdGk8Fpe4W3PkcpX2DxWO1rIHZdwT60vM.svg" }

      // const data: { token: string, user: IUser } = await onRequest(AuthService.login(mockData))
      // console.log(data)

      // setTokenToLocalStorage(data.token)

      // // setUserData(data)

      // if (data) {
      //   dispatch(login(data.user))
      // } else {
      //   dispatch(logout())
      // }





      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        const newUserData = window.Telegram.WebApp.initDataUnsafe.user

        const data: { token: string, user: IUser } = await onRequest(AuthService.login(newUserData))
        console.log(data)

        setTokenToLocalStorage(data.token)

        // setUserData(data)

        if (data) {
          dispatch(login(data.user))
        } else {
          dispatch(logout())
        }
      }
      else {
        alert('no telegram data')
      }





    } catch (error) {
      console.error("Ошибка при получении профиля:", error)
      // dispatch(logout())
    } finally {
      // dispatch(setLoading(false))
    }

  }

  // // const savedUserData = localStorage.getItem('userData');
  // // if (savedUserData) {
  // //   setUserData(JSON.parse(savedUserData));
  // // }

  // // console.log(JSON.parse(`{"id":2027571609,"first_name":"Artem","last_name":"","username":"TeM4ik20","language_code":"ru","is_premium":true,"allows_write_to_pm":true,"photo_url":"https://t.me/i/userpic/320/kf7ulebcULGdGk8Fpe4W3PkcpX2DxWO1rIHZdwT60vM.svg","lastVisit":"2025-04-16T13:36:17.055Z"}`));

  // if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
  //   const newUserData = window.Telegram.WebApp.initDataUnsafe.user

  //   const data = await onRequest(AuthService.Telegram.login(newUserData))

  //   const data

  //   localStorage.setItem('userData', JSON.stringify(newUserData));
  //   setUserData(newUserData);
  // }
  // else {
  //   alert('no telegram data')
  // }


  useEffect(() => {
    checkAuth()
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>
      <Router>
        <Header />

        <p className='break-words'>{userData && JSON.stringify(userData)}</p>
        <main className='h-full z-[0]'>
          <Routes>
            <Route path={RoutesConfig.HOME.path} element={<MainPage />} />
            <Route path={RoutesConfig.FILTERS.path} element={<FiltersPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;