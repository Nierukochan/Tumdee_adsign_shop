import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import Sidebar from '../../components/manage_sidebar/manageSidebar'
import Updatetowork from '../../components/updatetoworking/updatetowork.jsx'
import './manageorder.css'

function manageorder() {

  const [order, Setorder] = useState([])
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [orderitems, setOrderitems] = useState()

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/cart/getallorder', { withCredentials: true })
      Setorder(response.data)
      console.log(response.data)
    }
    fetchItems()
    console.log('item has been fetch')
  }, [])

  const handleUploadClick = (orderId,orderItem) => {
    setOrderitems(orderItem)
    setSelectedOrderId(orderId);
    setIsOverlayOpen(true);
  };

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
               <h1>คำสั่งซื้อใหม่</h1>
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
                {/* <div className="mproduct-box">
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
                </div> */}
                 <div className="order-manage-map" key={item.order_items_id} onClick={() => handleUploadClick(item.order_id,item.order_items_id)}>
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
            <Updatetowork isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} orderId={selectedOrderId} orderItem={orderitems}/>
            </div>
         </div>
      </div>
    </>
  )
}

export default manageorder