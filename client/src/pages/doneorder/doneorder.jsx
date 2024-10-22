import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/manage_sidebar/manageSidebar'

function doneorder() {

  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/order/getdoneorder', { withCredentials: true })
      setOrder(response.data)
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

            <div className="order-manage-box">
                <div className="order-manage-head">
                  <h1>คำสั่งซื้อที่สำเร็จแล้ว</h1>
                </div>
                <div className="search-bar">
                      <label htmlFor="">Search:</label>
                      <input type="text" />
                </div>

              <div className="order-manage-content">
              {order.length > 0 ? (
                <>
                  {order.map(item => (
                    <>
                    <div className="order-manage-map" key={item.order_items_id} > {/* onClick={() => handleUploadClick(item.order_id,item.order_items_id) */}
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
                                        <div className="no-paid">
                                          <p>ไม่ได้อัปโหลดหลักฐานการชำระ</p>
                                        </div>
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
                    </>
                  ))}
                </>):(<p></p>)}
                {/* <Updatetodone isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} orderId={selectedOrderId} orderItem={orderitems}/> */}
                </div>
            </div>
          </div>
        </>
  )
}

export default doneorder