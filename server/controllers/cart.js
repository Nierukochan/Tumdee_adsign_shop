const db = require('../connectdb.js')

const addtocart = async (req,res) => {
  
  //const cus_id = localStorage.getItem("user")
  const product = await [
    req.user.cus_id,
    req.body.product_id,
    req.body.qty
  ]
  db.query("INSERT INTO cart VALUE (?)", [product], async (err) => {
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Added to cart.')
  })

}

const getcart = async (req,res) => {

  db.query("SELECT * FROM cart WHERE cus_id = ?",await [req.uer.cus_id], async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
}

const deletecart = async (req,res) => {

}


module.exports = {addtocart, getcart, deletecart}