const express = require('express')
const { login, register, logout } = require("../controllers/auth");
//const { verifyToken } = require('../controllers/verifyToken')
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

module.exports = router