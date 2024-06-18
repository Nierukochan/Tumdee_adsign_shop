import React from 'react'
import './loginform.css'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


function Login() {
  return ( 
    
    <div>
      <div className='wrapper'>
        <form action=""></form>
        <h1>Sign-in</h1>
        <div className='input-box'>
          <MdAlternateEmail className='icon' />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Enter Email'/>
        </div>

        <div className='input-box'>
          <RiLockPasswordFill className='icon'/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password'/>
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot password</a>
        </div>

        <button type="submit" className="btn-login">Sign-in</button>

        <div className="register">
          <p>Don't have an account? <a href="#"></a>Register</p>
        </div>
      </div>
    </div>)
  
}

export default Login