const express = require('express')
const {getProducts, createProducts, getallProducts, deleteProduct, addcategory, updateProduct} = require('../controllers/product')
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

router.post('/createProducts',upload.single('file'),createProducts)
router.post('/createCategory',addcategory)
router.put('/updateproduct/:product_id',upload.single('file'),updateProduct)
router.delete('/deleteproduct/:product_id',deleteProduct)
router.get('/getallProducts',getallProducts)
router.get('/getProducts/:product_id', getProducts)

module.exports = router