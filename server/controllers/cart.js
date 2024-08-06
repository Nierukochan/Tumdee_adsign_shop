const db = require('../connectdb.js')

const addtocart = async (req,res) => {
  
  const userID = "2df3b10b-1"; // or wherever the user ID is stored
    if (!userID) {
      return res.status(401).json('User ID not found');
    }
  const product = await [
    userID,
    req.body.product_id, 
    req.body.qty
  ]

  //The problem is Unauthenticated token cuz,we can't get cus_id
  //Now its worked but it still can't get cus_id error 401 not found user id
  console.log(userID)
  
  db.query("INSERT INTO cart VALUE (?)", [product], async (err) => {
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Added to cart.')
  })

}

const getcart = async (req,res) => {
  db.query("SELECT * FROM cart WHERE cus_id = ?",await [req.uer.cus_id], async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json('its worked',data)
  })
}

const deletecart = async (req,res) => {

}


module.exports = {addtocart, getcart, deletecart}