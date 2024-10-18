import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/manage_sidebar/manageSidebar'

function manageorder() {

  const [order, Setorder] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/cart/getallorder', { withCredentials: true })
      Setorder(response.data)
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])

  return (
    <>
    <Navbar/>

    <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="content-container">
         <Sidebar />

         <div className="manage-product-content">

         {order.length > 0 ? (
            <>
              {order.map(item => (
                <>
                <div className="mproduct-box">
                <div className="mproduct_content-1">
                    <p>id: {item.order_items_id}</p>
                    <img src={`http://localhost:2000/images/` + item.task_img} alt="" />
                  </div>

                  <div className="mproduct_content-2">
                    <div className="detail-box">
                        <h4>{item.product_name}<span>({item.category_name})</span></h4>
                        <hr />
                        <p>รายละเอียด : {item.detail}</p>
                        <p>รหัสลูกค้า : {item.cus_id}</p>
                        <span>ชื่อลูกค้า : {item.cus_name}</span>
                    </div>
                    <div className="update-link">
                        <a href={`/updateproduct`+`/`+ item.order_items_id}>update</a>
                    </div>
                  </div>
                </div>
                </>
              ))}
            </>):(<p></p>)}
         </div>
      </div>
    </>
  )
}

export default manageorder