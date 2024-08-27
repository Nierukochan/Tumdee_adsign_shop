import React from 'react'
import { useState,useEffect } from 'react';
import './navbar.css'

function navbar() {

  const storedName = JSON.parse(localStorage.getItem("user"))
  const [name, setName] = useState('');
  useEffect(() => {
    if (storedName) {
      setName(storedName.cus_name);
    }
  }, []);
  return (
    <header className='header'>
      <a href="/" className='logo'>Tumdee</a>

      <nav className='navbar'>
          <a href="">Product</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login/Register</a>
          <a href="">Profile</a>
      </nav>
    </header>
  )
}

export default navbar