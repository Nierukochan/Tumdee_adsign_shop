import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './ordermanage.css'
import Navbar from '../../components/Navbar/navbar'
import Customersidebar from '../../components/customer_sidebar/customersidebar'
import Ordermanage from '../../components/order_manage_cus/ordermanage'

function ordermanage() {
  return (
    <>
    <Navbar/>
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <Customersidebar/>
        <Ordermanage/>
      </div>
    </>
  )
}

export default ordermanage