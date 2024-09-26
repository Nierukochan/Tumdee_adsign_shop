const express = require('express')
const { addtocart, getcart, deletecart, updatecart, testorder2, createOrder } = require('../controllers/cart')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.post("/addtocart/:product_id",verifyToken, addtocart)
router.get("/getcart", verifyToken, getcart)
router.delete("/deletecart/:order_id",verifyToken, deletecart)
router.get('/testorder',verifyToken,testorder2)
router.post('/testorder2',verifyToken,createOrder)
router.put("/")

module.exports = router