import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './adminlogin.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useEmpAuth } from '../../context/empcontext.jsx'

function adminlogin() {

  const [inputs, setInputs] = useState({
    emp_id: "",
    password: ""
  })

  const { login } = useEmpAuth();

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await login(inputs)
      navigate("/Manageproduct")
      setErr(null)
    } catch (err) {
      setErr(err)
    }
  }
  return (
    <>
      <div className='login-content'>
      <div className='wrapper'>
        <form action=""></form>
          <h1>Tumdee'emp Sign-in</h1>
          <div className='input-box'>
            <MdAlternateEmail className='icon' />
            <label htmlFor="emp_id">Emp_id</label>
            <input name="emp_id" onChange={handleChange} type="emp_id" placeholder='Enter emp_id' />
          </div>

          <div className='input-box'>
            <RiLockPasswordFill className='icon' />
            <label htmlFor="password">Password</label>
            <input name="password" onChange={handleChange} type="password" placeholder='Enter Password' />
          </div>

          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password</a>
          </div>

          <button onClick={handleLogin} type="submit" className="btn-login">Sign-in</button>

          <div className="register">
            <Link to="/register">
              <p>Don't have an account? Register</p>
            </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default adminlogin