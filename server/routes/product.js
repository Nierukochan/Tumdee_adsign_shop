const express = require('express')
const {getProducts, createProducts} = require('../controllers/product')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.post('/createProducts',createProducts)

module.exports = router