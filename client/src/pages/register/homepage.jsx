import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function homepage() {

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const storedName = JSON.parse(localStorage.getItem("user"))
  const [name, setName] = useState('');
  useEffect(() => {
    if (storedName) {
      setName(storedName.cus_name);
    }
  }, []);

  const [inputs, setInputs] = useState({
    product_id: "",
    qty: ""
  })

  const navigator = useNavigate()


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2000/api/cart/addtocart",inputs,{withCredentials: true})
      console.log('Product has been added in your cart',inputs)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Hello Manchester</h1>
      <h1>{name}</h1>
      <br />
      <Link to="/login">
        <button type="submit" >New Log-in</button>
      </Link>
      <br />

      <button type='submit'>Log-out</button>

      <div className="input-container">

        <div className="input-con-box">
          <label htmlFor="product_id">product_id</label>
          <input onChange={handleChange} name="product_id" type="text" />
        </div>

        <div className="input-con-box">
          <label htmlFor="qty">qty</label>
          <input onChange={handleChange} name="qty" type="number" />
        </div>

        <button type='submit' onClick={handleClick}>addtocart</button>
      </div>
    </div>
  )
}

export default homepage