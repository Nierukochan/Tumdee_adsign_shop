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
import Manageproduct from './pages/Manageproduct/Manageproduct.jsx'
import Updateproduct from './pages/upgradeproduct/upgradeproduct.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx';
import Address from './pages/address/address.jsx'
import Updatecart from './pages/Updatecart/updatecart.jsx'
import Manageorder from './pages/Manageorder/manageorder.jsx'
import Ordermanage from './pages/order_management/ordermanage.jsx';

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
  },
  {
    path:'/Manageproduct',
    element: <Manageproduct/>
  },
  ,
  {
    path:'/updateproduct/:product_id',
    element: <Updateproduct/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/address',
    element:<Address/>
  },
  {
    path:'/updatecart/:order_items_id',
    element:<Updatecart/>
  },
  {
    path:'/manageorder',
    element:<Manageorder/>
  },
  {
    path:'/account',
    element:<Ordermanage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
