import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/manage_sidebar/manageSidebar'
import './Createproduct.css'

function Createproduct() {

  const [category_name, setCategoty] = useState() /* for new category */
  const [category, Setcategory] = useState([]) /* fetch category */
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState()
  const [product, setProduct] = useState('')
  const [products, setProducts] =useState([]) /* fetch */

  const [size, setSize] = useState({
    size_value: "",
    price: 0,
    product_id: ""
  })

  const [inputs, setInputs] = useState({
    product_id: "",
    product_img: "",
    product_name: "",
    product_price: "",
    product_detail: "",
    category_id: ""
  })

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/product/getcategory', { withCredentials: true })
      Setcategory(response.data)
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/product/getallProducts', { withCredentials: true })
      setProducts(response.data)
      setProduct(response.data[0]?.product_id )
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])

  const handleChangeforCategory = (e) => {
    const selectedValue = e.target.value
    setSelectedCategory(selectedValue)
  }

  const handleChangeforSize = (e) => {
    const selectedValue = e.target.value
    setProduct(selectedValue)
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(e.target.files)
  }

  const handleChangesize = (e) => {
    setSize((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(e.target.files)
  }

  const handleCategoryChange = (e) => {
    setCategoty((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryClick = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:2000/api/product/createCategory', category_name, { withCredentials: true })
      console.log('Category has been created', category_name)
      // alert("Hello! I am an alert box!!");
      window.location.reload()
    } catch (error) {

    }
  }

  const handleSizeClick = async (e) => {
    e.preventDefault()

    const sizedata = {
      size_value: size.size_value,
      price: size.price,
      product_id: product,
    }

    console.log('size_value:', employeeData);


    try {
      await axios.post('http://localhost:2000/api/product/addproductsize', sizedata, { withCredentials: true })
      console.log('Category has been created', size.size_value)
      // alert("Hello! I am an alert box!!");
      window.location.reload()
    } catch (error) {
      console.error('Error uploading receipt:', error.response ? error.response.data : error.message)
    }
  }

  const clicktest = async (e) => {
    e.preventDefault()
    console.log(product)
  }

  const handleClick = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('product_id', inputs.product_id);
    formData.append('product_name', inputs.product_name);
    formData.append('product_price', inputs.product_price);
    formData.append('product_detail', inputs.product_detail);
    formData.append('file', file);
    formData.append('category_id', selectedCategory)
    try {
      await axios.post('http://localhost:2000/api/product/createProducts', formData, { withCredentials: true })
      console.log('Product has been created', inputs)
      window.location.reload()
      alert("Product has been created");
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

        <Sidebar />

        <div className="create">
          <div className="content-create">
            <h3>Create product</h3>
            <p>Provide the necessary details to register your business with us</p>
            <hr />
            <div className="input-create">
              <label htmlFor="product_id">Product_id</label>
              <input onChange={handleChange} type="text" name="product_id" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_name">Product name</label>
              <input onChange={handleChange} type="text" name="product_name" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_price">Product price</label>
              <input onChange={handleChange} type="number" name="product_price" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_detail">Product detail</label>
              <input onChange={handleChange} type="text" name="product_detail" required></input>
            </div>

            <div className="input-create">
              <label htmlFor="product_img">Image</label>
              <input onChange={handleFileChange} type="file" name="product_img" required></input>
            </div>

            <div className="input-create-2">
              <label htmlFor="category">Category</label>
              <div className="list-box">
                <select name="category" onChange={handleChangeforCategory}>
                  {category.length > 0 ? (
                    <>
                      {category.map(item => (
                        <option value={item.category_id}>{item.category_name}</option>
                      ))} </>) : (
                    <p></p>
                  )}
                </select>
              </div>
            </div>

            <div className="create-action">
              <button onClick={handleClick} type="submit">Create Product</button>
              {/* <button onClick={clicktest} type="submit">Test Product</button> */}
            </div>

            <hr />
            <h3>Create size</h3>
            <p>Provide the necessary details to register your business with us</p>
            <div className="input-create-2">
              <label htmlFor="product_size">Size</label>

              <div className='size-input'>
                <select name="product-u" onChange={handleChangeforSize}>
                  {products.length > 0 ? (
                    <>
                      {products.map(item => (
                        <option value={item.product_id}>{item.product_name}</option>
                      ))} </>) : (
                    <p></p>
                  )}
                </select>
                <input type="text" name="size_value" placeholder="Size Value" onChange={handleChangesize} required></input>
                <input type="number" name="price" placeholder="Size Price" onChange={handleChangesize} required></input>
              </div>
            </div>

            <div className="create-action">
              <button type="button" onClick={handleSizeClick}>add size</button>
            </div>

            <hr />
            <h3>New Category</h3>
            <p>Provide the necessary details to register your business with us</p>

            <div className="input-create">
              <label htmlFor="category_name">Category name</label>
              <input onChange={handleCategoryChange} type="text" name="category_name" required></input>
            </div>

            <div className="create-action">
              <button onClick={handleCategoryClick} type="submit">Create Product</button>
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