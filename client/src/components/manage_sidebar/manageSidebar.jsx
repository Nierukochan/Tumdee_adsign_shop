import React from 'react'
import './manageSidebar.css'

function manageSidebar() {
  return (
    <>
    <div className="sidebar-container">
          <ul>
            <li><a href="/Manageproduct">จัดการสินค้า</a></li>
            <li><a href="/createProduct">เพิ่มสินค้า</a></li>
            <li><a href="/manageorder">คำสั่งซื้อใหม่</a></li>
            <li><a href="/Workingorder">คำสั่งซื้อที่กำลังดำเนินการ</a></li>
            <li><a href="/Doneorder">คำสั่งซื้อที่สำเร็จแล้ว</a></li>
            <li><a href="/addemployee">พนักงาน</a></li>
            <li><a href="/dashboard">dashboard</a></li>
            <li><a href="#">`</a></li>
            <li><a href="#">ออกจากระบบ</a></li>
          </ul>
        </div>
    </>
  )
}

export default manageSidebar