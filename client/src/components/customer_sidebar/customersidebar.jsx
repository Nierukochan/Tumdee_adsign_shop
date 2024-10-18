import React from 'react'
import './customersidebar.css'

function customersidebar() {
  return (
    <>
    <div className="sidebar-container">
          <ul>
            <li><a href="/Manageproduct">รายการสั่งซื้อของฉัน</a></li>
            <li><a href="/createProduct">แก้ไขที่อยู่ในการจัดส่ง</a></li>
            <li><a href="/manageorder">จัดการคำสั่งซื้อ</a></li>
            <li><a href="#">แก้ไขข้อมูลของฉัน</a></li>
            <li><a href="#">`</a></li>
            <li><a href="#">ออกจากระบบ</a></li>
          </ul>
        </div>
    </>
  )
}

export default customersidebar