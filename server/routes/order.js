const express = require('express')
const { verifyToken, verifyEmpToken } = require('../controllers/verifyToken.js')
const { getprocessingOrders ,addpaymentreciept, getupdatetowork, updateorderstatus, getorderworking, getdoneorder, getdoneordercus} = require('../controllers/order.js')
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

/*upload.single('file')*/

router.get('/getprocessingOrders',verifyToken,getprocessingOrders)
router.put('/addpaymentreceipt',verifyToken,upload.single('file'),addpaymentreciept)
router.post('/getupdatetowork',verifyEmpToken,getupdatetowork)
router.put('/updateorderstatus',verifyEmpToken,updateorderstatus)
router.get('/getorderworking',verifyEmpToken,getorderworking)
router.get('/getdoneorder',verifyEmpToken,getdoneorder)
router.get('/getdoneordercus',verifyToken,getdoneordercus)
// router.get('/getposition',getposition)

module.exports = router