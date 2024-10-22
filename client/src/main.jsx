import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authcontext.jsx'
import { EmpContextProvider } from './context/empcontext.jsx'
import Login from './pages/login/login';
import Adminlogin from './pages/admin_login/adminlogin.jsx';
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
import Addemployee from './pages/addemployee/addemployee.jsx'
import Workingorder from './pages/workingorder/workingorder.jsx'
import Doneorder from './pages/doneorder/doneorder.jsx'
import Orderhistory from './pages/order_history/orderhistory.jsx'

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
  },
  {
    path:'/emplogin',
    element:<Adminlogin/>
  },
  {
    path:'/addemployee',
    element:<Addemployee/>
  },
  {
    path:'/Workingorder',
    element:<Workingorder/>
  },
  {
    path:'/Doneorder',
    element:<Doneorder/>
  },
  {
    path:'/Orderhistory',
    element:<Orderhistory/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <EmpContextProvider>
        <RouterProvider router={router} />
      </EmpContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
