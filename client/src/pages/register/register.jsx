import axios from 'axios'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import './registerform.css'
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

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigator = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2000/api/authenticate/register",inputs)
      navigator('/')
      setErr(null);
    } catch (err) {
      console.error('Error while registration:', err);
      if (err.response) {
        setErr(err.response.data);
      } else {
        setErr("Please try again.");
      }
    }
  }

  console.log(err)

  return (
    <div className='regis-container'>
      <div className="wrapper">
        <h1>Sign Up</h1>
        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input name="email" onChange={handleChange} type="email" placeholder='luvkaijeow@gmail.com' />
        </div>

        <div className="input-container">
          <div className="input-con-box">
            <label htmlFor="Name">name</label>
            <input name="name" onChange={handleChange} type="text" />
          </div>

          <div className="input-con-box">
            <label htmlFor="lastname">lastname</label>
            <input name="lastname" onChange={handleChange} type="text" />
          </div>
        </div>

        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input name="password" onChange={handleChange} type="password" placeholder='A-Z or 0-9' />
        </div>

        <div className="input-box">
          <label htmlFor="tel">tel</label>
          <input name="tel" onChange={handleChange} type="text" placeholder='099xxxxxxx' />
        </div>

        <div className="input-box">
          <label htmlFor="address">address</label>
          <input name="address" onChange={handleChange} type="textarea" placeholder='185 HatYai , Songkhla' />
        </div>
        {err && err}
        <button onClick={handleClick} type="submit" className="btn-login">Sign-in</button>

        <div className="register">
          <Link to="/login">
           <p>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register