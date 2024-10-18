import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar'
import axios from 'axios';

function updatecart() {

  const { order_items_id } = useParams(); 
  const [file, setFile] = useState(null)
  const [inputs, setInputs] = useState({
    size:'',
    qty:'',
    detail:'',
    task_img:'',
    product_name:'',
    product_img:'',
    product_price:''
  })

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/cart/getcartbyid/${order_items_id}`, {withCredentials: true})
        const orderData = response.data[0]
        setInputs({
          size: orderData.size,
          qty: orderData.qty,
          detail: orderData.detail,
          task_img: orderData.task_img,
          product_name: orderData.product_name,
          product_img: orderData.product_img,
          product_price: orderData.product_price
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchCart();
  }, [order_items_id])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('size', inputs.size);
    formData.append('qty', inputs.qty);
    formData.append('detail', inputs.detail);
    
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(`http://localhost:2000/api/cart/updatecart/${order_items_id}`, formData, {withCredentials: true,});
      alert('Order has been updated');
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update the order');
    }
  }


  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="product-detail-container">
     
          <div className="product-detail-content">
            <div className="left-content">

            {inputs ? (
              <>
              <div className="product-head">
                <h2>{inputs.product_name}</h2>
                {/* <span>{input.category_name}</span> */}
              </div>
            
                <div className="img-box">
                  <img src={`http://localhost:2000/images/` + inputs.product_img }  alt="" />
                </div>
              </>
              ):(<p></p>)}
              

              <div className="product-detail">
                
              </div>

            </div>

            <div className="right-content">
              <div className="product-head">
                <p>.</p>
              </div>
                  <hr />
              {inputs ? (
              <>
                <div className="product-input">
                  <label htmlFor="size">size:</label>
                  <input  value={inputs.size} onChange={handleChange} type="text" name="size" />
                </div>
                <div className="product-input">
                  <label htmlFor="qty">จำนวน:</label>
                  <input onChange={handleChange} value={inputs.qty} type="number" name="qty" />
                </div>
                <div className="product-input">
                  <label htmlFor="detail">รายละเอียด:</label>
                  <input onChange={handleChange} value={inputs.detail} type="text" name="detail" />
                </div>
                <div className="product-input">
                  <label htmlFor="task_img">งานของคุณ:</label>
                  <input onChange={handleFileChange}  type="file" name="task_img" required></input>
                </div>
                <div className="product-info">
                  <h2>ราคารวม: 100.00 บาท</h2>
                  <span>ราคาต่อหน่วย: บาท</span>
                </div>
                </>):(<p></p>)}


                    <hr />
                <div className="product-action">
                  <button onClick={handleClick} href='' type="submit">Add to cart</button>
                </div>

            </div>
          </div>
        
      </div>
    </>
  )
}

export default updatecart