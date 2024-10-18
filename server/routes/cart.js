const express = require('express')
const { addtocart, getcart, deletecart, updatecart, testorder2, createOrder, testdashboard, getcartbyid, getallorder, getaddress } = require('../controllers/cart')
const { verifyToken } = require('../controllers/verifyToken')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './public/images')
  },filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage})

const router = express.Router()

router.post("/addtocart/:product_id",verifyToken,upload.single('file'), addtocart)
router.get("/getcart", verifyToken, getcart)
router.delete("/deletecart/:order_id",verifyToken, deletecart)
router.get('/testorder',verifyToken,testorder2)
router.post('/createOrder',verifyToken,createOrder)
router.get('/testdashboard',verifyToken,testdashboard)
router.put('/updatecart/:order_items_id',verifyToken,upload.single('file'), updatecart)
router.get('/getcartbyid/:order_items_id',verifyToken,getcartbyid)
router.get('/getallorder',getallorder)
router.get('/getaddress',verifyToken,getaddress)

module.exports = router