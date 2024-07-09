import axios from 'axios'
import { useState } from "react"
import './registerform.css'
import { Link } from "react-router-dom"
import React from 'react'

function Register() {

  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    tel: "",
    address: ""
  })

  const [err, setErr] = useState(null)

  const hanbleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2000/api/authenticate/register",inputs)
    } catch (err) {
      setErr(err.response.data)
    }
  }

  console.log(err)
  
  return (
    <div>
      <div className="wrapper">
        <h1>Sign Up</h1>
        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='luvkaijeow@gmail.com' />
        </div>

        <div className="input-container">
          <div className="input-con-box">
            <label htmlFor="Name">name</label>
            <input type="text" />
          </div>

          <div className="input-con-box">
            <label htmlFor="lastname">lastname</label>
            <input type="text" />
          </div>
        </div>

        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='A-Z or 0-9' />
        </div>

        <div className="input-box">
          <label htmlFor="tel">tel</label>
          <input type="text" placeholder='099xxxxxxx' />
        </div>

        <div className="input-box">
          <label htmlFor="address">address</label>
          <input type="textarea" placeholder='185 HatYai , Songkhla' />
        </div>

        <button type="submit" className="btn-login">Sign-in</button>

        <p>Already have an account?</p>
      </div>
    </div>
  )
}

export default Register