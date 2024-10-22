import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import Customersidebar from '../../components/customer_sidebar/customersidebar'
import Orderhistory from '../../components/order_history/order_history'

function orderhistory() {
  return (
    <>
    <Navbar/>
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <Customersidebar/>
        <Orderhistory/>
      </div>
    </>
  )
}

export default orderhistory