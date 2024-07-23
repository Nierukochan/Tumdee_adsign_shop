import React, {useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { AuthContext } from '../context/authcontext.jsx'
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import Homepage from '../pages/register/homepage';
import './index.css'


const router = createBrowserRouter([

  {
    path: '/',
    element: <Homepage/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
