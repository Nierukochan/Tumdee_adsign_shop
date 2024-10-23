import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import './cart.css'
import Navbar from "../../components/Navbar/navbar"
import { BsTrash3Fill } from "react-icons/bs"

function Cart() {

  const [cartItems, SetCartItems] = useState([])
  const totalSum = cartItems.reduce((total, item) => total + item.sum, 0);

  const navigate = useNavigate()

  const handleRemove = async (id) =>{
    try {
      await axios.delete(`http://localhost:2000/api/cart/deletecart/`+ id , { withCredentials: true })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('http://localhost:2000/api/cart/getcart', { withCredentials: true })
      SetCartItems(response.data)
      console.log(response.data)
    }

    fetchItems()
    console.log('item has been fetch')
  }, [])

  const handleClickforOrder = async (e) => {
    e.preventDefault();

    try {
      navigate('/address')
    } catch (error) {
      console.error(error)
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
        <div className="cart-container">
        <div className="cart-header">
          <h2>ตะกร้า</h2>
        </div>
        {cartItems.length > 0 ? (
            <>
            {cartItems.map((item)=>(
                <>
                    <div className="cart-items-box">
                        <div className="cart-items-image">
                            <span>ภาพชิ้นงาน</span>
                            <img src={`http://localhost:2000/images/` + item.task_img} alt="" />
                        </div>

                        <div className="cart-items-detail">
                          <div className="cart-top">
                              <p>{item.product_name}</p>
                              <a href={`/updatecart/${item.order_items_id}`}>แก้ไข</a>
                          </div>

                          <div className="cart-bot">
                              <div className="cart-detail">
                                  <p>ราคาต่อชิ้น:  {item.product_price} บาท</p>
                                  <p>จำนวน: {item.qty} ชิ้น</p>
                                  <p>รายละเอียด: {item.detail}</p>
                                  <p>ขนาด: {item.size} </p>
                                  <p>ราคารวม:</p>
                              </div>
                              <div className="cart-del">
                                <BsTrash3Fill className="trash" onClick={ e => handleRemove(item.order_items_id)}/>
                              </div>
                          </div>
                        </div>
                    </div>
                </>))}
              </>):null}
        </div> 
        <div className="action-container">
              <div className="action-cart-box">
                <div className="action-cart-header">
                    <h3>สรุปรายการ</h3>
                </div>
                <div className="action-cart-content">
                    {cartItems.length > 0 ? (
                      <>
                      {cartItems.map((item)=>(
                        <>
                          <span>{item.product_name} X{item.qty}</span>
                        </>
                      ))}
                      </>
                    ):null}
                </div>
                <hr />
                <div className="action-cart-button">
                    <h3>รวมการสั่งซื้อ {totalSum}</h3>
                    <button type="submit" onClick={handleClickforOrder}>ดำเนินการต่อ</button>
                </div>
              </div>
        </div>
      </div>
    </>
  )

}

export default Cart