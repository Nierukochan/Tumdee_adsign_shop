const db = require('../connectdb.js')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  // res.send("register")
  const { email, password } = await req.body;
  //Check user if exists
  db.query("SELECT * FROM customer WHERE email = ?", email, async (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (data.length) {
      return res.status(400).json("Email already exists")
    }

    //Create a new user and encode
    const hashedpassword = await bcrypt.hash(password, 10);
    const fullName = req.body.name + " " + req.body.lastname;

    const cusdata = await [
      fullName,
      req.body.tel,
      req.body.address,
      hashedpassword,
      req.body.email
    ]

    db.query("INSERT INTO customer VALUE (?)", [cusdata], async (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Profile has been created.");
    })

  })
}

const login = async (req, res) => {
  //res.send("login")
  const { email, password } = await req.body
  db.query('SELECT email FROM customer WHERE email = ?', email, async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(200).json("Log in has been successed.");
  })
}

const logout = async (req, res) => {
  //res.send('logout')
}


module.exports = { login, register, logout };