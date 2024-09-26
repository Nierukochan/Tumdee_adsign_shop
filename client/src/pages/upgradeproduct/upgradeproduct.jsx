import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar.jsx';
import Sidebar from '../../components/manage_sidebar/manageSidebar.jsx';
import './upgradeproduct.css';

function UpdateProduct() {
  const { product_id } = useParams();  // Get product_id from URL
  const [file, setFile] = useState(null); // File for product image
  const [inputs, setInputs] = useState({
    product_id: '',
    product_name: '',
    product_price: '',
    product_detail: '',
    product_img: ''
  });

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/product/getProducts/${product_id}`, {
          withCredentials: true,
        });
        const productData = response.data[0];
        setInputs({
          product_id: productData.product_id,
          product_name: productData.product_name,
          product_price: productData.product_price,
          product_detail: productData.product_detail,
          product_img: productData.product_img
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to update product
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_id', inputs.product_id);
    formData.append('product_name', inputs.product_name);
    formData.append('product_price', inputs.product_price);
    formData.append('product_detail', inputs.product_detail);

    // Append the file only if a new file is selected
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.put(`http://localhost:2000/api/product/updateproduct/${inputs.product_id}`, formData, {withCredentials: true,});
      alert('Product has been updated');
      window.location.reload(); // Optionally reload the page or redirect
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product');
    }
  };

  return (
    <>
      <Navbar />
      <div className="header-homepage-container">
        <div className="header-homepage-content">
          {/* Content if needed */}
        </div>
      </div>

      <div className="content-container">
        <Sidebar />
        <div className="update-product-content">
          <div className="content-create">
            <h3>Update Product</h3>
            <p>Update the necessary product details</p>
            <hr />

            {inputs ? (
              <>
                {/* Product ID */}
                <div className="input-create">
                  <label htmlFor="product_id">Product ID</label>
                  <input
                    type="text"
                    name="product_id"
                    value={inputs.product_id}
                    onChange={handleChange}
                    readOnly // Disable editing for product ID
                  />
                </div>

                {/* Product Name */}
                <div className="input-create">
                  <label htmlFor="product_name">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    value={inputs.product_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Product Price */}
                <div className="input-create">
                  <label htmlFor="product_price">Product Price</label>
                  <input
                    type="number"
                    name="product_price"
                    value={inputs.product_price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Product Detail */}
                <div className="input-create">
                  <label htmlFor="product_detail">Product Detail</label>
                  <input
                    type="text"
                    name="product_detail"
                    value={inputs.product_detail}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Product Image */}
                <div className="input-create">
                  <label htmlFor="product_img">Product Image</label>
                  <input
                    type="file"
                    name="product_img"
                    onChange={handleFileChange}
                  />
                  {inputs.product_img && (
                    <div className="current-image">
                      <p>Current Image: {inputs.product_img}</p>
                      <img src={`http://localhost:2000/uploads/${inputs.product_img}`} alt="Product" />
                    </div>
                  )}
                </div>

                <div className="create-action">
                  <button onClick={handleClick}>Update Product</button>
                </div>
              </>
            ) : (
              <p>Loading product details...</p>
            )}

            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
