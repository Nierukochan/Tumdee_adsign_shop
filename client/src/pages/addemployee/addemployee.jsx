import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './addemployee.css'
import Navbar from '../../components/Navbar/navbar.jsx'
import Sidebar from '../../components/manage_sidebar/manageSidebar.jsx'
import Addemployee from '../../components/addemployee/addemployee.jsx'

function addemployee() {

  return (
    <>
    <Navbar/>
    <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <Sidebar/>
        <Addemployee/>
      </div>
    </>
  )
}

export default addemployee