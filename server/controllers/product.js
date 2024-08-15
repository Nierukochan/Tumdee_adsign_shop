const db = require('../connectdb.js')

const getProducts = async (req, res) => {
    db.query('SELECT * FROM product', async (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

const createProducts = async (req, res) => {
  db.query('INSERT INTO product VALUE(?)',[newproduct],async (err, data) =>{
    if (err) return res.status(500).json('server error')
    return res.status(200).json('Product has been added.')
  } )
}

module.exports = { getProducts }