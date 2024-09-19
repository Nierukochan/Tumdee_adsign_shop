import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../../components/์Navbar/navbar'
import './Createproduct.css'
function Createproduct() {

  const [file, setFile] = useState()
  const [inputs, setInputs] = useState({
    product_id: "",
    product_name: "",
    product_price: "",
    product_detail: "",
    product_size: [
      { size_value: "", price: "" }
    ]
  })

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(e.target.files)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('product_id', inputs.product_id);
    formData.append('product_name', inputs.product_name);
    formData.append('product_price', inputs.product_price);
    formData.append('product_detail', inputs.product_detail);
    formData.append('file', file);
    try {
      await axios.post('http://localhost:2000/api/product/createProducts', formData, { withCredentials: true })
      console.log('Product has been created', inputs)
    } catch (error) {

    }
  }
  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <div className="sidebar-container">
          <ul>
            <li><a href="#">นามบัตร</a></li>
            <li><a href="#">ฉลาก/สติ๊กเกอร์</a></li>
            <li><a href="#">ใบปลิว/แผ่นพับ</a></li>
            <li><a href="#">ตรายาง</a></li>
            <li><a href="#">สั่งพิมพ์ในสำนักงาน</a></li>
            <li><a href="#">อุปกรณ์ออกบูธ</a></li>
            <li><a href="#">Calendar</a></li>
            <li><a href="#">สินค้าขายดี</a></li>
          </ul>
        </div>

        <div className="create">
          <div className="content-create">
            <h3>Create product</h3>
            <p>Provide the necessary details to register your business with us</p>
            <hr />
            <div className="input-create">
              <label htmlFor="product_id">Product_id</label>
              <input type="text" name="product_id" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_name">Product name</label>
              <input type="text" name="product_name" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_price">Product price</label>
              <input type="number" name="product_price" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_detail">Product detail</label>
              <input type="text" name="product_detail" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_img">Image</label>
              <input type="file" name="product_img" required></input>
            </div>

            <div className="input-create-2">
              <label htmlFor="product_img">Category</label>
              <div className="list-box">
                <select name="countries" >
                  <option value="1">Afghanistan</option>
                  <option value="2">Australia</option>
                  <option value="3">Germany</option>
                  <option value="4">Canada</option>
                  <option value="5">Russia</option>
                  <option value="3">Germany</option>
                  <option value="4">Canada</option>
                  <option value="5">Russia</option>
                </select>
              </div>
            </div>

            <div className="create-action">
              <button type="button">Create Product</button>
            </div>

            <hr />
            <h3>Create size</h3>
            <p>Provide the necessary details to register your business with us</p>
            <div className="input-create-2">
              <label htmlFor="product_size">Size</label>
              
                <div className='size-input'>
                  <input  type="text" name="size_value" placeholder="Size Value" required></input>
                  <input  type="number" name="price" placeholder="Size Price" required></input>
                </div>
            </div>

            <div className="create-action">
              <button type="button">Create Product</button>
            </div>

            <hr />
            <h3>New Category</h3>
            <p>Provide the necessary details to register your business with us</p>
            
            <div className="input-create">
              <label htmlFor="category_name">Category name</label>
              <input type="text" name="category_name" required></input>
            </div>

            <div className="create-action">
              <button type="button">Create Product</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">

      </div>

    </>
  )
}

export default Createproduct