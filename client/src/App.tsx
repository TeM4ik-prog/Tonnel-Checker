import { Header } from '@/components/layout/Header';
import { RoutesConfig } from '@/types/pagesConfig';
import { lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FiltersPage from './pages/FiltersPage';
import MainPage from './pages/MainPage';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user?: TelegramUser;
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
  const [userData, setUserData] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    console.log(JSON.parse(`{"id":2027571609,"first_name":"Artem","last_name":"","username":"TeM4ik20","language_code":"ru","is_premium":true,"allows_write_to_pm":true,"photo_url":"https://t.me/i/userpic/320/kf7ulebcULGdGk8Fpe4W3PkcpX2DxWO1rIHZdwT60vM.svg","lastVisit":"2025-04-16T13:36:17.055Z"}`));

    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const newUserData = {
        ...window.Telegram.WebApp.initDataUnsafe.user,
        lastVisit: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(newUserData));
      setUserData(newUserData);
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>
      <Router>
        <Header />

        {/* <p>{userData && JSON.stringify(userData)}</p> */}
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