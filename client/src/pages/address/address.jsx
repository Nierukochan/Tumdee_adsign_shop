import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar';
import './address.css';
import AddOverlay from '../../components/overlay/addressOverlay';

function Address({ current_address }) {

  const [customer, setCustomer] = useState([]);
  const [address, setAddress] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [inputs, setInputs] = useState();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const totalSum = orders.reduce((total, item) => total + item.sum, 0);
 
  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`http://localhost:2000/api/authenticate/getuser`, { withCredentials: true });
      setCustomer(response.data);
      console.log(response.data);
      if (response.data.length > 0) {
        setAddress(response.data[0]);
      }
    };
    fetchItems();
    console.log('item has been fetched');
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:2000/api/cart/getcart`, { withCredentials: true });
      setOrders(response.data);
      console.log(response.data);
    };
    fetchOrders();
    console.log('order has been fetched');
  }, []);

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress); 
    setIsOverlayOpen(false); 
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let address_id 

    if (current_address && current_address.length > 0) {
      address_id = current_address.address_id;
    } else if (address && address.address_id) {
        address_id = address.address_id;
    } else {
        console.error('No valid address found');
    }

    alert('this is address_id'+ address_id)

    // try {
    //   await axios.post('http://localhost:2000/api/cart/createOrder', { address_id }, { withCredentials: true });
    //   console.log('Its work');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content"></div>
      </div>

      <div className="address-container">
        <div className="address-box">
          <h3>ที่อยู่การจัดส่ง</h3>
          <div className="address-detail">
            {customer[0] ? (
              <div className="customer-info">
                <p>{customer[0].cus_name} (+66)</p>
                <p>{customer[0].cus_tel}</p>
              </div>
            ) : (
              <>no data 404</>
            )}

            <div className="address-info">
              {current_address ? (
                <>
                  <p>{current_address.address}</p>
                  <p>
                    จังหวัด{current_address.province} อำเภอ{current_address.city} รหัสไปรษณีย์ {current_address.postnum}
                  </p>
                </>
              ) : (
                <>
                  <p>{address.address}</p>
                  <p>
                    จังหวัด{address.province} อำเภอ{address.city} รหัสไปรษณีย์ {address.postnum}
                  </p>
                </>
              )}
            </div>

            <div className="address-action">
              <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>เปลี่ยนที่อยู่</button>

              <AddOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}  onAddressSelect={handleAddressChange}/>
            </div>
          </div>
        </div>

        <div className="order-box">
          <div className="order-header">
            <div className="order-header-1">
              <h2>สั่งซื้อสินค้า</h2>
            </div>
            <div className="productdetail-box">
              <span>ราคาต่อหน่วย</span>
            </div>
            <div className="productdetail-box">
              <span>จำนวน</span>
            </div>
            <div className="productdetail-box">
              <span>รายการย่อย</span>
            </div>
          </div>

          <hr/>

          {orders.length > 0 ? (
            <>
              {orders.map((item) => (
                <div className="order-content" key={item.id}>
                  <div className="orderdetail-box">
                    <div className="order-img">
                      <img src={`http://localhost:2000/images/` + item.task_img} alt="" />
                    </div>
                    <div className="product-order-name">
                      <h4>{item.product_name}</h4>
                      <span>ขนาด {item.size}</span>
                      <span>รายละเอียด {item.detail}</span>
                    </div>
                  </div>

                  <div className="productdetail-box">
                    <span>{item.product_price}</span>
                  </div>
                  <div className="productdetail-box">
                    <span>{item.qty}</span>
                  </div>
                  <div className="productdetail-box">
                    <span>{item.sum}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}

          <div className="summary-order">
              <div className="sum-box">
                <h2>ราคารวม: {totalSum}</h2>
                <button onClick={handleClick}>ดำเนินการต่อ</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
