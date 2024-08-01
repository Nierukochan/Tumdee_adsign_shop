const db = require('../connectdb.js')

const getProducts = async (req, res) => {
    db.query('SELECT * FROM product', async (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })

}

module.exports = { getProducts }