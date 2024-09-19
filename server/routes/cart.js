const express = require('express')
const { addtocart, getcart, deletecart, updatecart } = require('../controllers/cart')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.post("/addtocart/:product_id",verifyToken, addtocart)
router.post("/getcart", verifyToken, getcart)
router.delete("/deletecart/:order_id",verifyToken, deletecart)
router.put("/")

module.exports = router