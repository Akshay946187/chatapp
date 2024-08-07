import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { SocketProvider } from './context/SocketContext.js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <Toaster closeButton />
      </SocketProvider>
    </Provider>


  </React.StrictMode>,
)
