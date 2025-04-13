import { lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RoutesConfig } from '@/types/pagesConfig';
import MainPage from './pages/MainPage';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
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
  const [tg, settg] = useState<any>(null)




  // useEffect(() => {
  //   if (window.Telegram?.WebApp) {
  //     const tg = window.Telegram.WebApp;

  //     settg(tg)
      
  //     // Раскрываем приложение на весь экран
  //     tg.expand();
      
      
  //     // Уведомляем Telegram, что приложение готово
  //     tg.ready();

  //     // Обработчик закрытия приложения
  //     const handleClose = () => {
  //       tg.sendData(JSON.stringify({
  //         action: 'webapp_closed',
  //         userId: tg.initDataUnsafe.user?.id,
  //         timestamp: new Date().toISOString()
  //       }));
  //       tg.close();
  //     };

  //     // Подписываемся на события
  //     tg.onEvent('viewportChanged', () => {
  //       if (!tg.isExpanded) {
  //         handleClose();
  //       }
  //     });

  //     // Очистка при размонтировании
  //     return () => {
  //       tg.offEvent('viewportChanged', handleClose);
  //     };
  //   }

    
  // }, []);



  

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>
      <Router>
        <Header />
        <main className='h-full z-[0]'>

          <Routes>
            <Route path={RoutesConfig.HOME.path} element={<MainPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;