const db = require('../connectdb.js')

const getProducts = async (req, res) => {
    db.query('SELECT * FROM product', async (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const createProducts = async (req, res) => {
  const newproduct = await [
    req.body.product_id,
    req.body.product_img,
    req.body.product_name,
    req.body.product_price,
    req.body.product_detail
  ]
  db.query('INSERT INTO product VALUE(?)',[newproduct],async (err, data) =>{
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Product has been added.')
  } )
}

const deleteProduct = async (req, res) => {

}

module.exports = { getProducts, createProducts }