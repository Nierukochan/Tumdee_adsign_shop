import { useState, useContext, useEffect } from "react"
import axios from "axios"
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/manage_sidebar/manageSidebar'
import './Manageproduct.css'

function Manageproduct() {

  const [products, SetProducts] = useState([])

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/product/deleteProduct/` + id, { withCredentials: true })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/product/getallProducts', { withCredentials: true })
      SetProducts(response.data)
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])


  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
        <Sidebar />

        <div className="manage-product-content">
          <div className="search-bar">
            <label htmlFor="">Search:</label>
            <input type="text" />
          </div>

          {products.length > 0 ? (
            <>
              {products.map(item => (
                <div key={item.product_id} className="mproduct-box">
                  <div className="mproduct_content-1">
                    <p>id: {item.product_id}</p>
                    <img src={`http://localhost:2000/images/` + item.product_img} alt="" />
                  </div>

                  <div className="mproduct_content-2">
                    <div className="detail-box">
                        <h3>{item.product_name}<span>({item.category_name})</span></h3>
                        <hr />
                        <p>รายละเอียด :{item.product_detail}</p>
                    </div>
                    <div className="update-link">
                        <a href={`/updateproduct`+`/`+ item.product_id}>update</a>
                    </div>
                  </div>

                  <div className="mproduct_content">
                    <div className="price-container">
                      <p>ราคา :  {item.product_price} บาท</p>
                    </div>

                    <div className="mproduct-action">
                      <button onClick={ e => handleRemove(item.product_id)} >remove</button>
                    </div>
                  </div>
                </div>
              ))}</>) : (
            <p></p>
          )}
        </div>

      </div>



    </>
  )
}

export default Manageproduct