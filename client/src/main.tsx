import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css'
import store from './store/store'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={'1026970301384-bi5knnci1e5ngs3ga2au87squ9p3f2mv.apps.googleusercontent.com'}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
    <ToastContainer position='bottom-left' autoClose={2000} />
  </Provider>
)
