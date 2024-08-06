const express = require('express')
const { addtocart, getcart, deletecart } = require('../controllers/cart')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.post("/addtocart",verifyToken, addtocart)
router.post("/getcart", verifyToken, getcart)

module.exports = router