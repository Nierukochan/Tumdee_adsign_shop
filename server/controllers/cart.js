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
    req.params.product_id, 
    req.body.qty,
    userID
  ]
  
  //The problem is Unauthenticated cuz,we can't get cus_id how can i solve it
  //Now its worked but it still can't get cus_id error 401 not found user id
  console.log(userID)
  
    db.query("INSERT INTO order_items VALUE (?)", [product], async (err) => {
      if (err) return res.status(500).json('server error')
      return res.status(200).json('Added to cart.')
    })
  //now its worked 
}

const getcart = async (req,res) => {
  const userID = req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }
  db.query("SELECT oi.*, p.* FROM order_items oi INNER JOIN product p ON oi.product_id = p.product_id WHERE oi.cus_id = ?",[userID], async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data) 
  })
}

const updatecart = async (req,res) => {
  const items_id = req.body.product_id
  if(!items_id) return res.status(404).json('Not found this item in your cat.')
}

const deletecart = async (req,res) => {
  const items_id = req.body.product_id
  if(!items_id) return res.status(404).json('Not found this item in your cat.')
    
  db.query("DELETE FROM order_items WHERE Order_items_id = ?",items_id, async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json("This items has been deleted.")
  })
}


module.exports = {addtocart, getcart, deletecart, updatecart}