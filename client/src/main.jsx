import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes/Routes.jsx'
import AuthProvider from './firebase/AuthProvider.jsx'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
