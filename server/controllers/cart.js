const db = require('../connectdb.js')
const { v4: uuidv4 } = require('uuid');

const addtocart = async (req,res) => {
  
  console.log("User info from token:", req.user);
  const userID = req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(401).json('User ID not found');//its worked
    }

  const order_items_id = uuidv4();

  const product = await [
    order_items_id,
    req.body.product_id, 
    req.body.qty,
    userID
  ]

  //The problem is Unauthenticated token cuz,we can't get cus_id
  //Now its worked but it still can't get cus_id error 401 not found user id
  console.log(userID)
  
    db.query("INSERT INTO order_items VALUE (?)", [product], async (err) => {
      if (err) return res.status(500).json('server error')
      return res.status(200).json('Added to cart.')
    })
 

  //how can i get userid from token or localstorage frontend?**
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