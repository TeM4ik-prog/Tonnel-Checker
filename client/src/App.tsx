import { Suspense, useEffect, useState } from 'react'
import { Home, Search, User } from 'lucide-react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RoutesConfig } from '@/types/pagesConfig';
import { MainPage } from '@/pages/MainPage';
import { AuthService } from './services/auth.service';
import { login, logout, setLoading } from './store/user/user.slice';
import { useDispatch } from 'react-redux';
import { useUpdateUserTrigger } from './store/hooks';
import { NotFoundPage } from './pages/NotFoundPage';
import { EntryPage } from './pages/EntryPage';
import { PostsPage } from './pages/PostsPage';
import { CreatePostsPage } from './pages/CreatePostsPage';
import { onRequest } from './types';
import { CategoryService } from './services/category.service';
import { setCategories } from './store/categories/categories.slice';
import { InterviewsPage } from './pages/InterviewsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Section } from './components/ui/Section';
import { LoveGymnPage } from './pages/LoveGymnPage';


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


  const getCategories = async () => {
    const data = await onRequest(CategoryService.getCategories())
    console.log(data)
    if (data) {
      dispatch(setCategories(data))
    }
  }

  useEffect(() => {
    checkAuth()
    getCategories()
  }, [trigger])

  return (
    <div className='min-h-screen flex flex-col bg-gray-800'>


      <Router>
        <Header />
        <Suspense fallback={''}>


  
            <main className='p-2 h-full'>

            <Routes>
              <Route path={RoutesConfig.HOME.path} element={<MainPage />} />
              <Route path={RoutesConfig.ENTRY.path} element={<EntryPage />} />

              <Route path={`${RoutesConfig.POSTS.path}/:category`} element={<PostsPage />} />

              <Route path={RoutesConfig.CREATE_POSTS.path} element={<CreatePostsPage />} />

              <Route path={RoutesConfig.INTERVIEWS.path} element={<InterviewsPage />} />

              <Route path={RoutesConfig.PROFILE.path} element={<ProfilePage />} />

              <Route path={RoutesConfig.LOVE_GYMN.path} element={<LoveGymnPage />} />



              <Route path='*' element={<NotFoundPage />} />
            </Routes>


            </main>
          

        </Suspense>

        <Footer />
      </Router>

    </div>

  );
}

export default App
