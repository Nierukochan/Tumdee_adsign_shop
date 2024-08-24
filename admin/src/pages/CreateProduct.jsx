import { useState, useContext } from "react";
import axios from 'axios'


function createProduct() {

  const [inputs, setInputs] = useState({
    product_id: "",
    product_img:"",
    product_name:"",
    product_price:"",
    product_detail:""
  })

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(e.target.files)
  }

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:2000/api/product/createProducts',inputs,{withCredentials: true})
      console.log('Product has been created',inputs)
    } catch (error) {
      
    }
  }


  return (
      <div>

        <div className="input-container">

          <div className="input-con-box">
            <label htmlFor="product_id">product_id</label>
            <input onChange={handleChange} type="text" name="product_id" />
          </div>

          <div className="input-con-box">
            <label htmlFor="product_image">product_image</label>
            <input onChange={handleChange} type="file" name="product_img" />
          </div>

          <div className="input-con-box">
            <label htmlFor="product_name">product_name</label>
            <input onChange={handleChange} type="text" name="product_name" />
          </div>

          <div className="input-con-box">
            <label htmlFor="product_price">product_price</label>
            <input onChange={handleChange} type="number" name="product_price" />
          </div>

          <div className="input-con-box">
            <label htmlFor="product_detail">product_detail</label>
            <input onChange={handleChange} type="text" name="product_price" />
          </div>

        </div>

        <div className="action">
          <button type="submit" onClick={handleClick}>CREATE</button>
        </div>
      </div>
  )
}

export default createProduct