import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import AuthProvider from './Providers/AuthProviders.tsx'
import router from './Routes/Route.tsx';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient();
//  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8
ReactDOM.createRoot(document.getElementById('root')!).render(
<div className=''>
<AuthProvider>
<HelmetProvider>
<QueryClientProvider client={queryClient}>
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
</QueryClientProvider>
</HelmetProvider>
</AuthProvider>
</div>,
)
