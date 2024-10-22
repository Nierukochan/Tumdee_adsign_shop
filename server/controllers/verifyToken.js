const jwt = require('jsonwebtoken')

//authenticate
const verifyToken = async (req, res, next) => {
  try {
    //req
    const tokenkun = req.cookies.token;
    // console.log(tokenkun)
    if (!tokenkun) {
      return res.status(401).send('You re not Autenticated')
    }
    
  const splitedtoken = tokenkun.split(" ")[1] || tokenkun;
    jwt.verify(splitedtoken, "secretkey", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next()
    })

  } catch (err) {
    console.log(err)
    res.send('sEvVer ErrOR').status(500)
  }
}

const verifyEmpToken = async (req, res, next) => {
  try {

    const emptoken = req.cookies.emptoken;
    // console.log(emptoken)
    if (!emptoken) {
      return res.status(401).send('You re not Autenticated')
    }
    
    const splitedtoken = emptoken.split(" ")[1] || emptoken;
      jwt.verify(splitedtoken, "secretkey", (err, emp) => {
        if (err) res.status(403).json("Token is not valid!");
        req.emp = emp;
        next()
      })
      
  } catch (err) {
    console.log(err)
    res.send('sEvVer ErrOR').status(500)
  }
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

module.exports = { verifyToken, verifyandAuthorize, verifyEmpToken }