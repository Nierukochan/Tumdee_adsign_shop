const db = require('../connectdb.js')
const multer = require('multer')

const getProducts = async (req, res) => {
  const product_id = req.params.product_id
  db.query('SELECT p.* , c.* FROM product p INNER JOIN category c ON p.category_id = c.category_id WHERE product_id = ?', product_id, async (err, data) => {
    if (err) return res.status(500).json(err)
    // console.log(`Received request for productId: ${product_id}`);
    return res.status(200).json(data)
  })
}

const getallProducts = async (req, res) => {
  db.query('SELECT p.* , c.* FROM product p INNER JOIN category c ON p.category_id = c.category_id GROUP BY p.product_id', async (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
}


const createProducts = async (req, res) => {
  const newproduct = await [
    req.body.product_id,
    req.file.filename,
    req.body.product_name, 
    req.body.product_price,
    req.body.product_detail,
    req.body.category_id
  ]
  
  // console.log(req.body.product_img)
  db.query('INSERT INTO product VALUE(?)', [newproduct], async (err, data) => {
    if (err) return console.log(err)
    return res.status(200).json('Product has been added.')
  })
}

const addproductsize = async (req, res) => {
  const productsize = await [
    req.body.size_value,
    req.body.product_id,
    req.body.price
  ]

  db.query('INSERT INTO size (size_value, product_id, price) VALUES(?)', [productsize], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json('Size has been added.')
  })
}

const addcategory = async (req, res) => {
  const category_name = await req.body.category_name

  db.query('INSERT INTO category (category_name) VALUES (?)', category_name, (err, data) => {
    if (err) return console.log(err)
    console.log(err)
    return res.status(200).json('Category has been added.')
  })
}


const updateProduct = async (req, res) => {
  const product_id = req.params.product_id
  // const product_img = await req.file.filename

  let product_img;
  if (req.file) {
    product_img = req.file.filename;
  }

  db.query('SELECT * FROM product WHERE product_id = ?', product_id, async (err, result) => {
    if (err) return res.status(500).json(err)
      // console.log(`Received request for productId: ${product_id}`);
      // return res.status(200).json(result)
      
    if (!product_img) {
      product_img = result[0].product_img; 
    }

    db.query('UPDATE `product` SET `product_id`= ?, `product_img`=?, `product_name`=?, `product_price`=?,`product_detail`=? WHERE product_id=?',
      [
        req.body.product_id,
        product_img,
        req.body.product_name,
        req.body.product_price,
        req.body.product_detail,
        product_id
      ],
      (err, data) => {
        if (err) return res.status(500).json('server error')
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    )
  })
}

const getCategory = async (req, res) => {
  
  db.query('SELECT * FROM category',async (err,data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)
  })
}


const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id

  db.query('DELETE FROM `product` WHERE product_id = ?', product_id, async (err, data) => {
    if (err) return res.status(500).json(err)
    console.log(`Removed : ${product_id}`);
    return res.status(200).json()
  })

  // db.query('DELETE FROM `size` WHERE product_id = ?', product_id, async (err, data) => {
  //   if (err) return res.status(500).json(err)
  //   console.log(`Removed : ${product_id}`);
  //   return res.status(200).json()
  // })
}

module.exports = { getProducts, createProducts, getallProducts, addproductsize, deleteProduct, addcategory, updateProduct, getCategory }