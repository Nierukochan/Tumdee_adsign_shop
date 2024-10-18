const express = require('express')
const { verifyToken } = require('../controllers/verifyToken.js')
const { getprocessingOrders } = require('../controllers/order.js')

const router = express.Router()

router.get('/getprocessingOrders',verifyToken,getprocessingOrders)

module.exports = router