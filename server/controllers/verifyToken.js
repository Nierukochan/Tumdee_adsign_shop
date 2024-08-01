const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Invalid token.')
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('You re not authenticated.')
  }

}

module.exports = {verifyToken}