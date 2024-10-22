import React from 'react'
import './addemployee.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Overlayaddemp from '../overlayaddemp/overlayaddemp'

function addemployee() {

  const [employee, setEmployee] = useState([])
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`http://localhost:2000/api/authenticate/getemp`, { withCredentials: true });
      setEmployee(response.data);
      console.log(response.data);
    }

    fetchOrders();
    console.log('order has been fetched');
  }, [])

  const handleChange = (e) => {
    setEmployee([...e.target.name])
  }

  const handleClick = (e) => {
    e.preventdefault()

    try {
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="order-manage-box">
          <div className="addemp-head">
            {/*label button for add new employee and serch bar*/}
            <div className="addemp-label">
              <h1>พนักงาน</h1>
            </div>
            <div className="addemp-button">
              <button  onClick={() => setIsOverlayOpen(!isOverlayOpen)} >เพิ่มพนักงาน</button>
              <Overlayaddemp isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}/>
            </div>
          </div>
          <div className="addemp-container">
            {employee.length > 0 ? (
              <>
              {employee.map((item)=>(
                <>
                    <div className="emp-box">
                        <div className="emp-box-detail">
                          <p>รหัสพนักงาน: {item.emp_id}</p>
                          <span>ชื่อพนักงาน: {item.emp_name}</span>
                          <span>ตำแหน่ง: {item.position_id}</span>
                          <span>เบอร์ติดต่อซ {item.emp_tel}</span>
                        </div>
                        <div className="emp-box-action">
                            <div className="emp-left">
                                <button>แก้ไข</button>
                            </div>
                            <div className="emp-right">
                                <button>ลบพนักงาน</button>
                            </div>
                        </div>
                    </div>
                </>
              ))}
              </>
            ):null}
          </div>
        </div>
    </>
  )
}

export default addemployee