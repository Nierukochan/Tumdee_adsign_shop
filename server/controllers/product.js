const db = require('../connectdb.js')
const multer = require('multer')

const getProducts = async (req, res) => {
  const product_id = req.params.product_id
    db.query('SELECT * FROM product WHERE product_id = ?',product_id, async (err, data) => {
      if (err) return res.status(500).json(err)
        console.log(`Received request for productId: ${product_id}`);
      return res.status(200).json(data)
    })
}

const getallProducts = async (req, res) => {
  db.query('SELECT * FROM product',async (err, data) => {
    if (err) return res.status(500).json(err)
      return res.status(200).json(data)
  })
}


const createProducts = async (req, res) => {
  const newproduct = await [
    req.body.product_id,
    req.file.filename,
    req.body.product_name,
    req.body.product_price,
    req.body.product_detail
  ]

  console.log(req.body.product_img)
  db.query('INSERT INTO product VALUE(?)',[newproduct],async (err, data) =>{
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Product has been added.')
  } )
}

const addproductsize = async (req, res) => {
  const productsize = await [
    req.body.product_id,
    req,
  ]
}

const newcreateProducts = async (req,res) => {

  const newproduct = await [
    req.body.product_id,
    req.body.product_img,
    req.body.product_name,
    req.body.product_price,
    req.body.product_detail
  ]

  const product_size = await req.body.product_size

 const values = product_size.map(item => [item.size_value, req.body.product_id, item.price]);

  if (product_size.length) {
   
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO size (size_value, product_id, price) VALUES ?', [values], (err, data) => {
        if (err) return reject(err);
        resolve(data);
        /* console.log('its work') */
      });
    });
  }

  db.query('INSERT INTO product VALUE(?)',[newproduct],async (err, data) =>{
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Product has been added.')
  })
}

const updateProduct = async (req, res) => {
  
}

const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id

    db.query('DELETE FROM `product` WHERE product_id = ?',product_id, async (err, data) => {
      if (err) return res.status(500).json(err)
        console.log(`Removed : ${product_id}`);
      return res.status(200).json(data)
    })

    db.query('DELETE FROM `size` WHERE product_id = ?',product_id, async (err, data) => {
      if (err) return res.status(500).json(err)
        console.log(`Removed : ${product_id}`);
      return res.status(200).json(data)
    })
}

module.exports = { getProducts, createProducts, getallProducts, newcreateProducts, deleteProduct }