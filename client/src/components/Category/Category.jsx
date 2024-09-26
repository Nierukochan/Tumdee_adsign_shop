import React from 'react'
import { useState, useEffect } from 'react'
import './Category.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Category() {

  const [products, Setproducts] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/product/getallProducts', {}, { withCredentials: true })
      Setproducts(response.data)
      console.log(response.data)
    }

    fetchItems()
    console.log('item has been fetch')
  }, [])


  return (
    <div > 
    <div className="category-header">
      <h2>BROWSE BY CATEGORY</h2>
    </div>
      
    {products.length > 0 ? ( <ul className='product-ul'>
      {products.map(item => (
      <Link to={`/productdetail/${item.product_id}`}>
      <div className="slide-container">
          <div className="slide-content">
            <div className="card-wrapper">
              <div className="card">

                <div className="img-content">
                  <span className='overlay'></span>

                  <div className="card-image">
                    <img src={`http://localhost:2000/images/`+ item.product_img} alt="" className='card-img'/>
                  </div>
                </div>

                <div className="card-content">
                    <h2 className='product-name'>{item.product_name}</h2>
                </div>

              </div>
            </div>
          </div>
        </div>
        </Link> 
    ))}
     </ul>):( <p></p> )}
      
    </div>
  )
}

export default Category