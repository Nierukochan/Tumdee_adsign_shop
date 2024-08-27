import React from 'react'

function Category() {
  const imgphone = "https://i.pinimg.com/originals/f4/5c/b0/f45cb00318293450db4a73d33af6d820.png"

  return (
    <div className=''> 
      <div className="img_container">
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
          <img src={imgphone} alt="" />
      </div>
      <div className="product_info">
          <h5>Product Name</h5>
          <p>Product Detail</p>
          <span>Price</span>
      </div>
    </div>
  )
}

export default Category