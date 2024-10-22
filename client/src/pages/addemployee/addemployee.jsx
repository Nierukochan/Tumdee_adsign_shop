import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './addemployee.css'
import Navbar from '../../components/Navbar/navbar.jsx'
import Sidebar from '../../components/manage_sidebar/manageSidebar.jsx'

function addemployee() {

  const [employee, setEmployee] = useState([])

  const handleChange = (e) => {
    setEmployee([...e.target.name])
  }

  const handleClick = (e) => {
    e.preventdefault()

    try {
      
    } catch (error) {
      
    }
  }

  return (
    <>
    <Navbar/>
    <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <Sidebar/>
        <div className="order-manage-box">
          <div className="addemp-head">
            {/*label button for add new employee and serch bar*/}
          </div>
          <div className="addemp-container">
            {/*map employee*/}
          </div>
        </div>
      </div>
    </>
  )
}

export default addemployee