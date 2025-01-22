import { Suspense, useEffect, useState } from 'react'
import { Home, Search, User } from 'lucide-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RoutesEnum } from '@/types/pagesConfig';
import { MainPage } from '@/pages/MainPage';
import { AuthService } from './services/auth.service';
import { login, logout, setLoading } from './store/user/user.slice';
import { useDispatch } from 'react-redux';
import { useUpdateUserTrigger } from './store/hooks';


function App() {
  const dispatch = useDispatch()
  const trigger = useUpdateUserTrigger()

  const checkAuth = async () => {
    dispatch(setLoading(true))
    try {
      const data = await AuthService.getProfile()
      console.log(data)

      if (data) {
        dispatch(login(data))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      console.error("Ошибка при получении профиля:", error)
      dispatch(logout())
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    checkAuth()
  }, [trigger])

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>





      <Router>
        <Header />
        <Suspense fallback={''}>
          <Routes>
            <Route path="HOME" element={<MainPage />} />


            {/* <Route path='*' element={<NotFoundPage />} /> */}
          </Routes>
        </Suspense>

        <Footer />
      </Router>

    </div>

  );
}

export default App
