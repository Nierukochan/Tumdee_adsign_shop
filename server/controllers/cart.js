const db = require('../connectdb.js')
const { v4: uuidv4 } = require('uuid');

const addtocart = async (req,res) => {
  
  console.log("User info from token:", req.user);
  const userID = req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(401).json('User ID not found');//its worked
    }

  const order_items_id = uuidv4();
  const status_item = 'In cart'
  
  //The problem is Unauthenticated cuz,we can't get cus_id how can i solve it
  //Now its worked but it still can't get cus_id error 401 not found user id
  console.log(userID)

      const product = await [
        order_items_id,
        req.params.product_id, 
        req.body.qty,
        userID,
        status_item
      ]

    db.query("INSERT INTO order_items VALUE (?)", [product], async (err) => {
      if (err) return res.status(500).json('server error')
      return res.status(200).json('Added to cart.') 
    })
  //now its worked
}

const getcart = async (req,res) => {
  const status_item = 'In cart'
  const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

  db.query("SELECT oi.*, p.* FROM order_items oi INNER JOIN product p ON oi.product_id = p.product_id WHERE oi.cus_id = ? and oi.status_item = ?",[ userID, status_item ], async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data) 
  })
}

const updatecart = async (req,res) => {
  const order_items_id = req.params.order_id
  const values = [
    req.body.qty
  ]
  if(!order_items_id || values) return res.status(404).json('Not found this item in your cat.')

    db.query('UPDATE order_items set `qty` = ? where Order_items-id = ?',[...values, order_items_id], (err,data) => {
      if(err) return res.status(500).json(err)
        return res.status(200).json("Cart has been updated.")
    })
}

const deletecart = async (req,res) => {
  const order_items_id = req.params.order_id

  console.log('order_it_it :',order_items_id)
  if(!order_items_id) return res.status(404).json('Not found this item in your cat.')
    
  db.query("DELETE FROM order_items WHERE Order_items_id = ?",order_items_id, async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json("This items has been deleted.")
  })
}

const createOrder = async (req, res) => {

  const order_id = uuidv4()
  const status_item = 'In cart'
  
  const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

  const querychan = 
    ` SELECT oi.*, p.*, SUM(oi.qty * p.product_price) AS total_price
      FROM order_items oi
      INNER JOIN product p ON oi.product_id = p.product_id
      WHERE oi.cus_id = ? 
      AND oi.status_item = ? 
      GROUP BY oi.product_id`

  db.query(querychan,[userID, status_item], async (err, data) => {
    if(err) return res.status(500).json(err)
    // return res.status(200).json(data)

      const status_id = '1'
      const emp_id = 'emp1'

      data.forEach((order_items) => {
        const new_order = [
          order_id,
          order_items.order_items_id,
          order_items.total_price,
          order_items.cus_id,
          emp_id,
          status_id
        ];

        const order_items_id = order_items.order_items_id
        const status_item_2 = 'Done'
      
        // Insert into order_table
        db.query('INSERT INTO order_table (order_id, order_items_id, total_price, cus_id, emp_id, status_id) VALUES (?)', [new_order], (err) => {
          if (err) return res.status(500).json(err);

          db.query("UPDATE `order_items` SET `status_item`=? WHERE order_items_id = ? and status_item = 'In cart' ",
            [status_item_2,order_items_id],(err) => {
              if (err) return res.status(500).json(err);
          })
        })
      })

      return res.status(200).send('Order has been created')
  })
}

//test section

const testorder = async (req, res) => {
  const getItemsQuery = `SELECT cus_id, SUM(qty * product_price) AS total_price 
                         FROM order_items WHERE status_item = 'In cart' 
                         GROUP BY cus_id`;

  // Fetch customer data from order_items
  db.query(getItemsQuery, (err, customers) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Insert orders into order_table for each customer
    const insertOrderQuery = `INSERT INTO order_table (order_id, cus_id, total_price, order_status) 
                              VALUES (UUID(), ?, ?, 'Pending')`;

    customers.forEach((customer) => {
      db.query(insertOrderQuery, [customer.cus_id, customer.total_price], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error inserting into order_table' });
        }

        // Get the inserted order_id
        const orderId = result.insertId;

        // Update order_items with the order_id
        const updateItemsQuery = `UPDATE order_items SET order_id = ? 
                                  WHERE cus_id = ? AND status_item = 'In cart'`;

        db.query(updateItemsQuery, [orderId, customer.cus_id], (err, updateResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating order_items' });
          }
        });
      });
    });
    res.status(200).json({ message: 'Orders processed successfully!' });
  });
}

const testorder2 = async (req, res) => {
  
  const querychan = 
  ` SELECT oi.*, p.*, SUM(oi.qty * p.product_price) AS total_price
    FROM order_items oi
    INNER JOIN product p ON oi.product_id = p.product_id
    WHERE oi.cus_id = ? 
    AND oi.status_item = ? 
    GROUP BY oi.product_id`

  const status_item = 'In cart'
  
  const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

    db.query(querychan,[userID,status_item],(err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}


module.exports = {addtocart, getcart, deletecart, updatecart, testorder2, createOrder}