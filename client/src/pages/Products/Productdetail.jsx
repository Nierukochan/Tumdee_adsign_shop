import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import Navbar from '../../components/Navbar/navbar'
import './Productdetail.css'

function Productdetail() {

  const [product, Setproduct] = useState([])
  const [file, setFile] = useState()
  const [inputs, setInputs] = useState({
    size: "",
    qty: "",
    detail: "",
    task_img: ""
  })
  const { productId } = useParams()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:2000/api/product/getProducts/${productId}`, { withCredentials: true })
      Setproduct(response.data[0])
    }

    fetchProduct()
    console.log(product)
  }, [])

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('size', inputs.size);
    formData.append('qty', inputs.qty);
    formData.append('detail', inputs.detail);
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:2000/api/cart/addtocart/${productId}`, formData, { withCredentials: true })
      console.log('Product has been added in your cart', inputs)
      alert('สร้างคำสั่งซื้อสำเร็จ')
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content">

        </div>
      </div>

      <div className="product-detail-container">
        <div className="product-detail-sidebar">
          <ul>
            <li><a href="/Manageproduct">จัดการสินค้า</a></li>
            <li><a href="/createProduct">เพิ่มสินค้า</a></li>
            <li><a href="#">จัดการคำสั่งซื้อ</a></li>
            <li><a href="#">ประวัติคำสั่งซื้อ</a></li>
            <li><a href="#">พนักงาน</a></li>
            <li><a href="/dashboard">dashboard</a></li>
            <li><a href="#">`</a></li>
            <li><a href="#">ออกจากระบบ</a></li>
          </ul>
        </div>

        {product ? (
          <div className="product-detail-content">
            <div className="left-content">
              <div className="product-head">
                <h2>{product.product_name}</h2>
                <span>{product.category_name}</span>
              </div>
              <div className="img-box">
                <img src={`http://localhost:2000/images/` + product.product_img} alt="" />
              </div>

              <div className="product-detail">
                
              </div>

            </div>

            <div className="right-content">
              <div className="product-head">
                <p>.</p>
              </div>
                  <hr />

                <div className="product-input">
                  <label htmlFor="size">size:</label>
                  <input onChange={handleChange} type="text" name="size" />
                </div>
                <div className="product-input">
                  <label htmlFor="qty">จำนวน:</label>
                  <input onChange={handleChange} type="number" name="qty" />
                </div>
                <div className="product-input">
                  <label htmlFor="detail">รายละเอียด:</label>
                  <input onChange={handleChange} type="text" name="detail" />
                </div>
                <div className="product-input">
                  <label htmlFor="task_img">งานของคุณ:</label>
                  <input onChange={handleFileChange} type="file" name="task_img" required></input>
                </div>
                <div className="product-info">
                  <h2>ราคารวม: 100.00 บาท</h2>
                  <span>ราคาต่อหน่วย:  {product.product_price}  บาท</span>
                </div>
                    <hr />
                <div className="product-action">
                  <button onClick={handleClick} href='' type="submit">Add to cart</button>
                </div>

            </div>
          </div>
        ) : (<p></p>)}
      </div>
    </>
  )
}

export default Productdetail