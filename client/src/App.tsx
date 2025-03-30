import { lazy } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RoutesConfig } from '@/types/pagesConfig';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
import MainPage from './pages/MainPage';

function App() {
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
        <Footer />
      </Router>
    </div>
  );
}

export default App