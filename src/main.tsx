import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import AuthProvider from './Providers/AuthProviders.tsx'
import router from './Routes/Route.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
<AuthProvider>
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
</AuthProvider>,
)
