import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './store/store'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <ToastContainer position='bottom-left' autoClose={2000} />
    </Provider>
  </>

)