import React from 'react'
import './manageSidebar.css'

function manageSidebar() {
  return (
    <>
    <div className="sidebar-container">
          <ul>
            <li><a href="/Manageproduct">จัดการสินค้า</a></li>
            <li><a href="/createProduct">เพิ่มสินค้า</a></li>
            <li><a href="#">ใบปลิว/แผ่นพับ</a></li>
            <li><a href="#">ตรายาง</a></li>
            <li><a href="#">สั่งพิมพ์ในสำนักงาน</a></li>
            <li><a href="#">อุปกรณ์ออกบูธ</a></li>
            <li><a href="#">Calendar</a></li>
            <li><a href="#">สินค้าขายดี</a></li>
          </ul>
        </div>
    </>
  )
}

export default manageSidebar