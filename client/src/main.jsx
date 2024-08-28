import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authcontext.jsx'
import Login from './pages/login/login';
import Register from './pages/register/register';
import Homepage from './pages/register/homepage';
import Cart from './pages/cart/cart.jsx'
import Productdetail from './pages/Products/Productdetail.jsx'
import Createproduct from './pages/Products/Createproduct.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage/>
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/cart',
    element: <Cart/>
  },
  {
    path: '/productdetail/:productId',
    element: <Productdetail/>
  },
  {
    path: '/createProduct',
    element: <Createproduct/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
