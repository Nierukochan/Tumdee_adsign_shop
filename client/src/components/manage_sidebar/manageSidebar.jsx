import React from 'react'
import './manageSidebar.css'

function manageSidebar() {
  return (
    <>
    <div className="sidebar-container">
          <ul>
            <li><a href="/Manageproduct">จัดการสินค้า</a></li>
            <li><a href="/createProduct">เพิ่มสินค้า</a></li>
            <li><a href="/manageorder">จัดการคำสั่งซื้อ</a></li>
            <li><a href="#">ประวัติคำสั่งซื้อ</a></li>
            <li><a href="#">พนักงาน</a></li>
            <li><a href="/dashboard">dashboard</a></li>
            <li><a href="#">`</a></li>
            <li><a href="#">ออกจากระบบ</a></li>
          </ul>
        </div>
    </>
  )
}

export default manageSidebar