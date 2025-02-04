import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import AuthProvider from './Providers/AuthProvider';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';



const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
     {
      path: '/login',
      element: <Login></Login>
     },
     {
      path: '/register',
      element: <Register></Register>
     }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
