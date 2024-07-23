import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './loginform.css'
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthContext } from '../../context/authcontext.jsx'


function Login() {

  const {login} = useContext(AuthContext)
  
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await login(inputs)
      navigate("/")
      setErr(null)
    } catch (err) {
      setErr(err)
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
          <input name="email" onChange={handleChange} type="email" placeholder='Enter Email' />
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
    </div>)

}

export default Login