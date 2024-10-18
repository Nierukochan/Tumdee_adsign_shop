import React from 'react'
import './addressOverlay.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Address from '../../pages/address/address.jsx'



function addressOverlay({ isOpen, onClose, onAddressSelect  }) {
  const [address, setAddress] = useState([]);
  const [cur_address, setCurrentAddress] = useState();

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await axios.get(`http://localhost:2000/api/authenticate/getuser`, { withCredentials: true });
      setAddress(response.data);
      console.log(response.data);
    };
    fetchAddress();
    console.log('address has been fetched');
  }, []);

  const handleSelectAddress = async (address) => { 
    onAddressSelect(address);
    onClose(); 
  };

  return (
    <>
      {isOpen ? (
        <div className="overlay">
          <div className="overlay-bg">
            <div className="overlay-container">
              <div className="overlay-header">
                <h3>ที่อยู่ของฉัน</h3>
                <a onClick={onClose}>X</a>
              </div>

              <div className="overlay-content">
                {address.length > 0 ? (
                  <>
                    {address.map((item) => (
                      <div className="overlay-box" key={item.address_id}>
                        <div className="overlay-radio"></div>
                        <div className="overlay-address">
                          <div className="sender">
                            <div className="sender-l">
                              <h4>{item.cus_name}</h4>
                              <p>{item.cus_tel}</p>
                            </div>
                            <div className="sender-r">
                              <a href="">แก้ไข</a>
                            </div>
                          </div>
                          <div className="overlay-address-detail">
                            <div className="address-1">
                              <p>
                                {item.address} อำเภอ{item.city} จังหวัด{item.province} {item.postnum}
                              </p>
                            </div>
                            <div className="select-address-btn">
                              <button onClick={() => handleSelectAddress(item)}>เลือกที่อยู่</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}

                {cur_address && <Address current_address={cur_address} />}
              </div>

              <div className="add-new-address">
                <button>เพิ่มที่อยู่ใหม่</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default addressOverlay;