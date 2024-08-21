import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import './cart.css'

function Cart() {

  const [cartItems, SetCartItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      await axios.post('http://localhost:2000/api/cart/getcart', {}, { withCredentials: true }).then((response) => {
        SetCartItems(response.data)
      })
    }

    fetchItems()
    console.log(cartItems)
  }, [])

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length > 0 ? (
        <ul className="cart-items-list">
          {cartItems.map(item => (
            <li key={item.Order_items_id} className="cart-item">
              <div className="item-details">
                <p className="item-order-id">items_id: {item.Order_items_id}</p>
                <span className="item-name">Product: {item.product_id}</span>
                <span className="item-quantity">Quantity: {item.qty}</span>
              </div>
              <div className="item-actions">
                <button>Edit</button>
                <button >Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="cart-actions">
        <Link to="/" className="back-to-shop">Continue Shopping</Link>
      </div>
    </div>
  )

}

export default Cart