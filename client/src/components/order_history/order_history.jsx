import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


function order_history() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:2000/api/order/getdoneordercus`, { withCredentials: true });
      setOrders(response.data);
      console.log(response.data);
    }

    fetchOrders();
    console.log('order has been fetched');
  }, [])

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
                  <p>  {item.order_status_name}</p>
                </div>
                <div className="order-manage-detail-bot">
                  <h4>{item.product_name}</h4>
                  <p>จำนวน: X{item.qty}</p>
                  <p>รายละเอียด: {item.detail}</p>
                  <p>หมายเลขชิ้นงาน: {item.order_items_id}</p>
                  <p>ที่อยู่ในการจัดส่ง: {item.address} อำเภอ{item.city} จังหวัด{item.province} รหัสไปรษณีย์{item.postnum}</p>
                </div>
              </div>
              <div className="order-manage-action">
                  <div className="order-manage-action-top">
                    <p>หลักฐานการชำระเงิน</p>
                    {(!item.reciept_image || item.reciept_image === "null")  ? (
                      <button>upload</button>
                    ) : (
                      <img src={`http://localhost:2000/images/` + item.reciept_image} alt="Receipt" />
                    )}
                    {/* <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>upload</button> */}
                  </div>
                  <div className="order-manage-action-bot">
                    <h3>รวมการสั่งซื้อ {item.sum}</h3>
                  </div>
              </div>
            </div>
          ))}
        </>):(<><h2>ไม่พบคำสั่งซื้อ</h2></>)}
        {/* <Uploadreciept isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} orderId={selectedOrderId}/> */}
      </div>
    </div>
    </>
  )
}

export default order_history