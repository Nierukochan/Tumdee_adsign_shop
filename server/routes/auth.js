const express = require('express')
const { login, register, logout, getuser, empregister, emplogin } = require("../controllers/auth");
const { verifyToken } = require('../controllers/verifyToken')
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get('/getuser',verifyToken, getuser)
router.post('/empregister',empregister)
router.post('/emplogin',emplogin)

module.exports = router