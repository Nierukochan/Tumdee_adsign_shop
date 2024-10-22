import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './updatetowork.css'

function updatetowork({isOpen, onClose, orderId, orderItem}) {

  const [orders, setOrders] = useState([])
  const [order_items_id,setOrderitem] = useState(orderItem)

  console.log(orderItem)

  useEffect(() => {
    // Only fetch orders if the modal is open
    if (isOpen) {
      const fetchOrders = async () => {
        try {
          const response = await axios.post(`http://localhost:2000/api/order/getupdatetowork`,{ order_items_id: orderItem },{ withCredentials: true });
          setOrders(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

      fetchOrders();
      console.log('This order has been fetched');
    }
  }, [isOpen, orderItem])

  const handleClick = async (status_items,status_id) => {
        try {
          await axios.put('http://localhost:2000/api/order/updateorderstatus',{
            status_id: status_id,
            status_items: status_items,
            order_id: orderId,
            order_items_id: orderItem
          }, {withCredentials: true})
          console.log('Order has been updated')
          alert("Order has been updated");
          window.location.reload()
        } catch (error) {
          
        }
  }

  return (
    <>
      {isOpen ? (
        <>
          <div className="overlay">
            <div className="overlay-bg">
              <div className="update-container">
                <div className="overlay-header">
                  {/* <h3>{orderId}</h3> */}
                      <div className="order-ov-head">
                          <p>คำสั่งซื้อ {orderId}</p>
                          <p>หมายเลขชิ้นงาน {orderItem}</p>
                      </div>
                      <a onClick={onClose}>X</a>
                </div>

                {orders.length > 0 ? (
                <>
                  {orders.map(item => (<>
                    <div className="update-content"  key={item.order_items_id}>
                        <div className="order-update-address">
                          <div className="update-cus-name">
                              <h3 className='address-title'>ที่อยู่ในการจัดส่ง</h3>
                              <p>{item.cus_name} (+66)</p>
                              <p>{item.cus_tel}</p>
                          </div>

                          <div className="update-cus-address">              
                              <p>ที่อยู่ในการจัดส่ง: {item.address} อำเภอ{item.city} จังหวัด{item.province} รหัสไปรษณีย์{item.postnum}</p>
                          </div>
                        </div>

                        <div className="order-update-content">
                          <div className="order-update-detail">
                              <div className="order-update-img">
                                 <img src={`http://localhost:2000/images/` + item.task_img} alt="" />
                              </div>
                              <div className="update-detail">
                                <h4>{item.product_name}</h4>
                                <p>จำนวน: X{item.qty}</p>
                                <p>รายละเอียด: {item.detail}</p>
                                <p>ขนาดชิ้นงาน: {item.size}</p>
                                <p>หมายเลขลูกค้า: {item.cus_id}</p>
                              </div>
                          </div>
                          <div className="order-update-payment">
                              <div className="order-update-img">
                                  {(!item.reciept_image || item.reciept_image === "null")  ? (
                                      <div className="no-paid">
                                        <p>ไม่ได้อัปโหลดหลักฐานการชำระ</p>
                                      </div>
                                  ) : (
                                    <img src={`http://localhost:2000/images/` + item.reciept_image} alt="Receipt" />
                                  )}
                                 {/* <img src={`http://localhost:2000/images/` + item.reciept_image} alt="" /> */}
                              </div>

                              <div className="update-detail">
                                <p>payment id: {item.payment_id}</p>
                                <p>ผู้โอน: {item.transferor}</p>
                                <p>เวลา: {item.time}</p>
                                <p>วันที่: {item.date}</p>
                                <p>ยอดทั้งหมด: {item.amount}</p>
                              </div>
                          </div>                      
                        </div>

                        <div className="order-update-action">
                              {/*button for accept order and deny */}
                            <button className="button-left" >ปฏิเสธ</button> 
                            <button className="button-right" onClick={() => handleClick('3', '4')}>ยอมรับคำสั่งซื้อ</button>
                        </div>
                    </div>
                  </>))}</>):(<p></p>)}
                {/* order-box end here */}
              </div>
            </div>
          </div>
        </>):null}
    </>
  )
}

export default updatetowork