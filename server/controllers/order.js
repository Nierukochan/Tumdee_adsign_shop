const db = require('../connectdb.js')
const { v4: uuidv4 } = require('uuid');

const getprocessingOrders = async (req, res) => {

  const status_item = 'In progress'

  const userID = await req.user.cus_id;
  if(!userID) return res.status(404).json('User id not found')

  const qry = `SELECT o.*, oi.*, p.* , c.* , cus.cus_id ,SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                WHERE o.status_id = ? and o.cus_id = ? and oi.status_item = ?
                GROUP BY o.order_items_id;`

    db.query(qry,[1,userID,status_item],(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

module.exports = {getprocessingOrders}