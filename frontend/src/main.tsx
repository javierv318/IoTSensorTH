import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Dashboard2 from './routes/Dashboard2.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Dashboard",
        element: <Dashboard />
      },
      {
        path: "/Dashboard2",
        element: <Dashboard2/>
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)  
