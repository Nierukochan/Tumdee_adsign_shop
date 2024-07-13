import React, { useState } from 'react'
import './loginform.css'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


function Login() {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  //const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:2000/api/authenticate/login",inputs)
      //navigate("/")
      setErr(null)
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (

    <div>
      <div className='wrapper'>
        <form action=""></form>
        <h1>Sign-in</h1>
        <div className='input-box'>
          <MdAlternateEmail className='icon' />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Enter Email' />
        </div>

        <div className='input-box'>
          <RiLockPasswordFill className='icon' />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' />
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