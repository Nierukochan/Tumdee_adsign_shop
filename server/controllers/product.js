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

const deleteProduct = async (req, res) => {

}

module.exports = { getProducts, createProducts }