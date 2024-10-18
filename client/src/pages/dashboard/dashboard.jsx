import React from 'react';
import Navbar from '../../components/Navbar/navbar';
import Sidebar from '../../components/manage_sidebar/manageSidebar';
import Ordercount from '../../components/ordercount/ordercount'
import Ordersales from '../../components/ordersales/ordersales';
import './dashboard.css';

function Dashboard() {

  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content"></div>
      </div>

      <div className="content-container">
        <Sidebar />

        <div className="dashboard-box">
          <div className="label-box">
            <h3>ปริมาณคำสั่งซื้อของแต่ละสินค้า</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, modi!</p>
            <hr />
          </div>
          <Ordercount/>
          <div className="label-box">
            <h3>ยอดขายจากคำสั่งซื้อของแต่ละสินค้า</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, facilis.</p>
            <hr />
          </div>
          <Ordersales/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
