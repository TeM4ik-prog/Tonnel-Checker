import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './index.css'
import store from './store/store'
import App from './App'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ToastContainer position='bottom-left' autoClose={2000} />
  </Provider>
)
