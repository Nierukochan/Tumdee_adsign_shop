const db = require('../connectdb.js')

const addtocart = async (req,res) => {
  
  //const cus_id = localStorage.getItem("user")
  const product = await [
    req.body.productID,
    req.body.qty
  ]
  db.query("INSERT INTO cart VALUE (?)", [product], async (err) => {
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Added to cart.')
  })

}

const deletecart = async (req,res) => {

}


module.exports = {addtocart, deletecart}