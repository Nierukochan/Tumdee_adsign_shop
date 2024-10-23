import React from 'react'
import './uploadreciept.css'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function uploadreciept({ isOpen, onClose, orderId  }) {

  const [inputs, setInputs] = useState({
    reciept_image:"",
    amount:"",
    date: "",
    time: "",
    transferor: "",
    order_id: orderId
  })
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])

  useEffect(() => {
    if(images.length < 1 ) return;
    const newImageURLs = []
    images.forEach(images => newImageURLs.push(URL.createObjectURL(images)))
    setImageURLs(newImageURLs)
  },[images])

  const onImagesChange = (e) => {
    setImages([...e.target.files])
  }

  const handleChange = (e) => {
    setInputs((prev) => ({...prev,[e.target.name]: e.target.value,}))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    const paymentData = new FormData()
    paymentData.append('file', images[0])
    paymentData.append('amount', inputs.amount)
    paymentData.append('date', inputs.date)
    paymentData.append('time', inputs.time)
    paymentData.append('transferor', inputs.transferor)
    paymentData.append('order_id', orderId)

    try {
      await axios.put('http://localhost:2000/api/order/addpaymentreceipt', paymentData, { withCredentials: true })
      // console.log('Payment has been updated', inputs)
      window.location.reload()
      alert("Payment has been updated");
    } catch (error) {
      console.error('Error uploading receipt:', error.response ? error.response.data : error.message)
    }
  }

  return (
    <>
     {isOpen ? (
      <div className="overlay">
        <div className="overlay-bg">
          <div className="upload-container">
              <div className="overlay-header">  
                {/* <h3>{orderId}</h3> */}
                <h3>อัปโหลดหลักฐานการชำระเงิน</h3>
                <a onClick={onClose}>X</a>
              </div>
              <div className="upload-content">

                <div className="qr-img">
                  <div className="qr-code">
                     <img src={`http://localhost:2000/images/myqr.png`} alt="" />
                  </div>
                  <p>กรุงไทย 999-999-9999 | สุธาวณี กุลสันตติ</p>
                </div>
                
                <div className="upload-input">
                  <div className="date-time">

                        <div className="input-reciept">
                          <label htmlFor="">วันที่ทำการโอน</label>
                          <input type="date" name='date' onChange={handleChange}/>
                        </div>

                        <div className="input-reciept">
                          <label htmlFor="">เวลา</label>
                          <input type="time" name='time' onChange={handleChange} />
                        </div>

                  </div>
                  <div className="tranferror">

                      <div className="input-reciept">
                          <label htmlFor="">ผู้โอน</label>
                          <input type="text" name='transferor' onChange={handleChange}/>
                        </div>

                        <div className="input-reciept">
                          <label htmlFor="">ยอดชำระ</label>
                          <input type="number" name='amount' onChange={handleChange}/>
                        </div>

                      </div>
                </div>

                <div className="upload-img">
                      <label htmlFor="">รูปหลักฐาน</label>
                      <input type="file" multiple accept='image/*' onChange={onImagesChange}/>
                      <div className="preview-image">
                        {imageURLs.map ((imageSrc) => (
                          <img src={imageSrc}/>
                        ))}
                      </div>
                </div>
                <div className="upload-action">
                    <button type='submit' onClick={handleClick}>Upload</button>
                </div>

              </div>
          </div>
        </div>
    </div>
    ):null}
    </>
  )
}

export default uploadreciept