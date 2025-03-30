import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ToastContainer position='bottom-left' autoClose={2000} />
  </>

)