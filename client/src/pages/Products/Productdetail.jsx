import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import './Productdetail.css'

function Productdetail() {

  const [product, Setproduct] = useState([])
  const [inputs, setInputs] = useState({
    qty: ""
  })
  const {productId} = useParams()

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:2000/api/product/getProducts/${productId}`, { withCredentials: true })
      Setproduct(response.data[0])
      
    }

    fetchProduct()
    console.log(product)
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:2000/api/cart/addtocart/${productId}`,inputs,{withCredentials: true})
      console.log('Product has been added in your cart',inputs)
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <div className="main-content">
        <div className="side-bar">
          <h1>Product Details</h1>
          {product ? (
            <div>
              <div>

              </div>
              <p><strong>ID:</strong> {product.product_id}</p>
              <p><strong>Name:</strong> {product.product_name}</p>
              <p><strong>Price:</strong> ${product.product_price}</p>
              <p><strong>Details:</strong> {product.product_detail}</p>
            </div>
          ) : (
            <p>No product found</p>
          )}
        </div>

        <div className="productdetail">
          <div className="product-image">
            <div className="image">
              <img src="" alt="Product Image" />
            </div>
            <div className="product-info">
              <ul className="product-info-tab">
                <li>description</li>
                <li>price</li>
              </ul>
            </div>
          </div>

          <div className="product-detail-input">
            <div className="input-con">
              <label htmlFor="size">size</label>
              <input type="text" id="size" />
            </div>
            <div className="input-con">
              <label htmlFor="qty">qty</label>
              <input onChange={handleChange} name="qty" type="number" />
            </div>
            <div className="input-con">
              <label htmlFor="paper">paper</label>
              <input type="text" id="paper" />
            </div>

            <div className="input-con">
              <label htmlFor="input4">How many pages to print?</label>
              <input type="radio" id="one page" />
              <label htmlFor="input4">single side</label>
              <input type="radio" id="couple of page" />
              <label htmlFor="input4">double side</label>
            </div>

            <div className="price-span">
              <span>price(vat)</span>
            </div>

            <div className="product-action">
              <button onClick={handleClick} type="submit">Add to cart</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Productdetail