const express = require('express')
const { getUser } = require('../controllers/user')
const { verifyToken } = require('../controllers/verifyToken')

const router = express.Router()

router.get("/test", verifyToken, getUser)

module.exports = router