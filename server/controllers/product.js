const db = require('../connectdb.js')

const getProducts = async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).json('Not logged in.')
}

module.exports = { getProducts }