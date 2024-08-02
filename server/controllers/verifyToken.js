const jwt = require('jsonwebtoken')

//authenticate
const verifyToken = async (req,res,next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, "token", (err, user) => {
      if (err) res.status(403).json('Invalid token.')
      req.user = user
      next()
    })
  } 
    return res.status(401).json('You re not authenticated.')
}

//authorize
const verifyandAuthorize = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.cus_id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
}

module.exports = {verifyToken, verifyandAuthorize}