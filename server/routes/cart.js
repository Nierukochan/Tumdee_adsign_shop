const express = require('express')
const { addtocart, deletecart } = require('../controllers/cart')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.post("/test", verifyToken , addtocart)

module.exports = router