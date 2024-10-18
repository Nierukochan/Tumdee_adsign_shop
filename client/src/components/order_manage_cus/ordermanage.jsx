import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './ordermanage.css'

function ordermanage() {

  const [orders, setOrders] = useState([])
  const totalSum = orders.reduce((total, item) => total + item.total_price, 0);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:2000/api/order/getprocessingOrders`, { withCredentials: true });
      setOrders(response.data);
      console.log(response.data);
    };
    fetchOrders();
    console.log('order has been fetched');
  }, []);

  return (
    <>
    <div className="order-manage-box">
      <div className="order-manage-head">
        <h1>รายการสั่งซื้อของฉัน</h1>
      </div>
      <div className="search-bar">
            <label htmlFor="">Search:</label>
            <input type="text" />
      </div>
      <div className="order-manage-content">
        {orders.length > 0 ? (
          <>
          {orders.map((item)=> (
            <div className="order-manage-map" key={item.order_items_id}>
              <div className="order-manage-img">
                    <img src={`http://localhost:2000/images/` + item.task_img} alt="" />
              </div>
              <div className="order-manage-orderdetail">
                <div className="order-manage-detail-top">
                  <p>หมายเลขคำสั่งซื้อ  {item.order_id}  |</p>
                  <p>  {item.status_item}</p>
                </div>
                <div className="order-manage-detail-bot">
                  <h4>{item.product_name}</h4>
                  <p>จำนวน: X{item.qty}</p>
                </div>
              </div>
              <div className="order-manage-action">
                  <div className="order-manage-action-top">

                  </div>
                  <div className="order-manage-action-bot">
                    <h3>รวมการสั่งซื้อ {totalSum}</h3>
                  </div>
              </div>
            </div>
          ))}
        </>):(<><h2>ไม่พบคำสั่งซื้อ</h2></>)}
      
      </div>
    </div>
    </>
  )
}

export default ordermanage