const db = require('../connectdb.js')
const { v4: uuidv4 } = require('uuid');

const addtocart = async (req,res) => {
  
  console.log("User info from token:", req.user);
  const userID = req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(401).json('User ID not found');//its worked
    }

    let product_img;
    if (req.file) {
      product_img = req.file.filename;
    }

  const order_items_id = uuidv4();
  const status_item = 'In cart'
  
  //The problem is Unauthenticated cuz,we can't get cus_id how can i solve it
  //Now its worked but it still can't get cus_id error 401 not found user id
  console.log(userID)

      const product = await [
        order_items_id,
        req.params.product_id, 
        req.body.size,
        req.body.qty,
        req.body.detail,
        product_img,
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

  db.query("SELECT oi.*, p.* ,  SUM(oi.qty * p.product_price) as sum FROM order_items oi INNER JOIN product p ON oi.product_id = p.product_id WHERE oi.cus_id = ? and oi.status_item = ? GROUP BY oi.order_items_id",[ userID, status_item ], async (err, data) => {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data) 
  })
}



const getallorder = async (req, res) => {

  const status_item = 'In progress'
  const qry = `SELECT o.*, oi.*, p.* , c.* , cus.*
                FROM order_table o 
                INNER JOIN order_items oi ON o.order_items_id = oi.order_items_id 
                INNER JOIN product p ON oi.product_id = p.product_id 
                INNER JOIN category c ON p.category_id = c.category_id
                INNER JOIN customer cus ON oi.cus_id = cus.cus_id
                WHERE oi.status_item = ? 
                GROUP BY o.order_items_id;`
  
  db.query(qry,[status_item], (err,data)=> {
    if(err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
}

const getcartbyid = async (req, res) => {
  const order_items_id = req.params.order_items_id

  const userID = await req.user.cus_id;
  if(!userID) return res.status(404).json('User id not found')

    db.query('SELECT oi.*, p.* FROM order_items oi INNER JOIN product p ON oi.product_id = p.product_id WHERE oi.order_items_id = ?',[order_items_id],(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const ordersales = async (req, res) => {
  const  sqlquery = 
  ` SELECT oi.* , p.* , SUM(oi.qty * p.product_price) AS sales 
    FROM order_items oi 
    INNER JOIN product p ON oi.product_id = p.product_id
    WHERE oi.cus_id = ?
    AND oi.status_item = 'Done'
    GROUP BY oi.product_id`

    const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

    db.query(sqlquery,[userID],(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const updatecart = async (req,res) => {
  const order_items_id = req.params.order_items_id

  let task_img;
  if (req.file) {
    task_img = req.file.filename;
  }

  console.log(order_items_id)
  if(!order_items_id) return res.status(404).json('Not found this item in your cat.')

    db.query('SELECT * FROM order_items WHERE order_items_id = ?',order_items_id, (err,result) => {
      if(err) return res.status(500).json(err)

      if (!task_img) {
        task_img = result[0].task_img; 
      }

      db.query('UPDATE `order_items` SET `size`= ? , `qty` = ? , `detail` = ? , `task_img` = ?  WHERE order_items_id = ?',
        [
          req.body.size,
          req.body.qty,
          req.body.detail,
          task_img,
          order_items_id
        ],(err,data) => {
            if(err) return res.status(500).json(err)
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("Your can update only your cart!");
        })
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

/* create an order */
const createOrder = async (req, res) => {

  const order_id = uuidv4()
  const status_item = 'In cart'
  const address_id = req.body.address_id
  
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
      GROUP BY oi.order_items_id`

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
          address_id,
          emp_id,
          status_id
        ];

        const order_items_id = order_items.order_items_id
        const status_item_2 = 'In progress'
      
        // Insert into order_table
        db.query('INSERT INTO order_table (order_id, order_items_id, total_price, cus_id, address_id, emp_id, status_id) VALUES (?)', [new_order], (err) => {
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

const testdashboard = async (req, res) => {

  const  sqlquery = 
  ` SELECT oi.* , p.* , SUM(oi.qty * p.product_price) AS sales ,COUNT(oi.product_id) AS product_count 
    FROM order_items oi 
    INNER JOIN product p ON oi.product_id = p.product_id
    WHERE oi.status_item = 'Done'
    GROUP BY oi.product_id`

    db.query(sqlquery,(err,data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const testorder2 = async (req, res) => {
  
  const querychan = 
  ` SELECT oi.*, p.*, SUM(oi.qty * p.product_price) AS total_price
    FROM order_items oi
    INNER JOIN product p ON oi.product_id = p.product_id
    WHERE oi.cus_id = ? 
    AND oi.status_item = ? 
    GROUP BY oi.order_items_id`

  const status_item = 'Done'
  
  const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

    db.query(querychan,[userID,status_item],(err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const getaddress = async (req,res) => {

  const querychan = `SELECT c.cus_name, c.cus_tel , a.* FROM customer c
                     INNER JOIN address a ON a.cus_id = c.cus_id
                     WHERE c.cus_id = ?
                     GROUP BY a.address_id `

  const userID = await req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(404).json('User ID not found');//its worked
    }

    db.query(querychan,[userID],(err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}


module.exports = {addtocart, getcart, deletecart, updatecart, testorder2, createOrder, testdashboard, getcartbyid, getallorder, getaddress}