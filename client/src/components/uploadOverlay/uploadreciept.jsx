import React from 'react'
import './uploadreciept.css'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function uploadreciept({ isOpen, onClose, orderId  }) {

  const [order, setOrder] = useState([])
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

  const handleClick = (e) => {
    e.preventdefault()

    try {
      
    } catch (error) {
      
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
                  <img src="" alt="" />
                  <h3></h3>
                </div>
                
                <div className="upload-input">
                  <div className="date-time">

                        <div className="input-reciept">
                          <label htmlFor="">วันที่ทำการโอน</label>
                          <input type="date" />
                        </div>

                        <div className="input-reciept">
                          <label htmlFor="">เวลา</label>
                          <input type="time" />
                        </div>

                  </div>
                  <div className="tranferror">

                      <div className="input-reciept">
                          <label htmlFor="">ผู้โอน</label>
                          <input type="text" />
                        </div>

                        <div className="input-reciept">
                          <label htmlFor="">ยอดชำระ</label>
                          <input type="number" />
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
                    <button>Upload</button>
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