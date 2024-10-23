const db = require('../connectdb.js')
const { v4: uuidv4 } = require('uuid');

const getprocessingOrders = async (req, res) => {

  const status_item = '2'

  const userID = await req.user.cus_id;
  if(!userID) return res.status(404).json('User id not found')

  const qry = `SELECT a.*, o.*, oi.*, p.* , c.* , oi_s.*, order_s.* ,cus.cus_id ,pa.*, SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN address a ON o.address_id = a.address_id
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                INNER JOIN order_items_status oi_s ON oi.status_item = oi_s.status_item 
                INNER JOIN order_status order_s ON o.status_id = order_s.status_id 
                INNER JOIN payment pa ON o.payment_id = pa.payment_id
                WHERE o.status_id IN ('1', '2' , '4') and o.cus_id = ? and oi.status_item IN ('2','3')
                GROUP BY o.order_items_id`

    db.query(qry,[userID],(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const getupdatetowork = async (req, res) => {

  const qry = ` SELECT a.*, o.*, oi.*, p.* , c.* , oi_s.*, order_s.* ,cus.cus_id , cus.cus_name, cus.cus_tel, pa.*, SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN address a ON o.address_id = a.address_id
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                INNER JOIN order_items_status oi_s ON oi.status_item = oi_s.status_item 
                INNER JOIN order_status order_s ON o.status_id = order_s.status_id 
                INNER JOIN payment pa ON o.payment_id = pa.payment_id
                WHERE oi.order_items_id = ? `

  db.query(qry,[req.body.order_items_id],(err,data) => {
    if(err) return res.status(500).json(err)
      return res.status(200).json(data)
  })
}

const getorderworking = async (req,res) => {

  const qry = ` SELECT a.*, o.*, oi.*, p.* , c.* , oi_s.*, order_s.* ,cus.cus_id , cus.cus_name, cus.cus_tel, pa.*, SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN address a ON o.address_id = a.address_id
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                INNER JOIN order_items_status oi_s ON oi.status_item = oi_s.status_item 
                INNER JOIN order_status order_s ON o.status_id = order_s.status_id 
                INNER JOIN payment pa ON o.payment_id = pa.payment_id
                WHERE o.status_id = '4' and oi.status_item = '3' 
                GROUP BY o.order_items_id`

  db.query(qry,[],(err,data) => {
    if(err) return res.status(500).json(err)
      return res.status(200).json(data)
  })
}
//not yet so just update no select to show
const updateorderstatus = async (req,res) => {

  const { status_id, order_id, order_items_id, status_items } = req.body;
  const qry = 'UPDATE `order_table` SET `status_id` = ? WHERE order_id = ? AND order_items_id = ?'
  const qry1 = 'UPDATE `order_items` SET `status_item` = ? WHERE order_items_id = ?'
  
  db.query(qry,[status_id, req.body.order_id, req.body.order_items_id], (err,data)=> {
    if(err) return res.status(500).json(err)

      db.query(qry1,[req.body.status_items, req.body.order_items_id], (err,row) => {
        if(err) return res.status(500).json(err)  
      })
    return res.status(200).json(data)
  })
}

const addpaymentreciept = async (req,res) => {

  let reciept_image;
  if (req.file) {
    reciept_image = req.file.filename;
  }
  const status_id = '2'

  /*'UPDATE `product` SET `product_id`= ?, `product_img`=?, `product_name`=?, `product_price`=?,`product_detail`=? WHERE product_id=?'*/
  const qry = "UPDATE `payment` SET `reciept_image`= ?, `amount`=?, `date`=?, `time`=?, `transferor`=? WHERE order_id =?"
  const qry1 = 
  ` SELECT oi.*, o.*
    FROM order_table o
    INNER JOIN order_items oi ON oi.order_items_id = o.order_items_id
    WHERE o.order_id = ? `
  const qry2 = 'UPDATE `order_table` SET `status_id` = ?  WHERE order_id = ?'


  db.query(qry2,[status_id,req.body.order_id],(err,data) => {
    if(err) return res.status(500).json(err)

      db.query(qry,[
        reciept_image,
        req.body.amount,
        req.body.date,
        req.body.time,
        req.body.transferor,
        req.body.order_id

      ],(err,data)=> {
        if(err) return res.status(500).json(err)
        // return res.status(200).json({message:`Payment receipt uploaded`})

      })

    return res.status(200).json({message:`Payment receipt uploaded`})
  })
}

const getdoneorder = async (req, res) => {
  const qry = ` SELECT a.*, o.*, oi.*, p.* , c.* , oi_s.*, order_s.* ,cus.cus_id , cus.cus_name, cus.cus_tel, pa.*, SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN address a ON o.address_id = a.address_id
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                INNER JOIN order_items_status oi_s ON oi.status_item = oi_s.status_item 
                INNER JOIN order_status order_s ON o.status_id = order_s.status_id 
                INNER JOIN payment pa ON o.payment_id = pa.payment_id
                WHERE o.status_id = '5' and oi.status_item = '4' 
                GROUP BY o.order_items_id`

  db.query(qry,[],(err,data) => {
    if(err) return res.status(500).json(err)
      return res.status(200).json(data)
  })
}

const getdoneordercus = async (req, res) => {

  const userID = await req.user.cus_id;
  if(!userID) return res.status(404).json('User id not found')

  const qry = ` SELECT a.*, o.*, oi.*, p.* , c.* , oi_s.*, order_s.* ,cus.cus_id , cus.cus_name, cus.cus_tel, pa.*, SUM(o.total_price) As sum
                FROM order_table o 
                INNER JOIN address a ON o.address_id = a.address_id
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                INNER JOIN order_items_status oi_s ON oi.status_item = oi_s.status_item 
                INNER JOIN order_status order_s ON o.status_id = order_s.status_id 
                INNER JOIN payment pa ON o.payment_id = pa.payment_id
                WHERE o.status_id = '5' and oi.status_item = '4' and cus.cus_id = ? 
                GROUP BY o.order_items_id`

  db.query(qry,[userID],(err,data) => {
    if(err) return res.status(500).json(err)
      return res.status(200).json(data)
  })
}


module.exports = {getprocessingOrders, addpaymentreciept, getupdatetowork, updateorderstatus, getorderworking, getdoneorder, getdoneordercus}