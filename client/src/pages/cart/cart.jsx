import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import './cart.css'
import Navbar from "../../components/Navbar/navbar"

function Cart() {

  const [cartItems, SetCartItems] = useState([])

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
      await axios.post(`http://localhost:2000/api/cart/createOrder`,{},{withCredentials:true})
      alert('สร้างคำสั่งซื้อสำเร็จ')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="big-box">
        <div className="header-container">
          <h1 className="cart-title">Cart</h1>
        </div>
      </div>
      <div className="cart-container">

        <div className="items-box">
          {cartItems.length > 0 ? (
            <Link className="link">
              {cartItems.map(item => (
                <ul key={item.Order_items_id}>
                  <div className="wrapper-cart">
                    <div className="project">
                      <div className="shop">
                        <div className="box">
                          <img src={`http://localhost:2000/images/`+ item.product_img} alt="" />

                          <div className="content">
                            <h2>Product: {item.product_name}</h2>
                            <p>price:  {item.product_price}</p>
                            <p>quantity: {item.qty}</p>
                            <p>detail: {item.detail}</p>
                            <p>size: {item.size} </p>
                            <p>subtotal:</p>
                            <div className="items-actions">
                              <button className="btn-remove" onClick={ e => handleRemove(item.order_items_id)}>Remove</button>
                              <Link to={`/updatecart/${item.order_items_id}`}>update</Link>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              ))} </Link>) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="order-bar">
          <p>total:</p>
          <hr />
          <button className="btn-edit" onClick={handleClickforOrder}>Order</button>
        </div>
      </div>
    </>
  )

}

export default Cart