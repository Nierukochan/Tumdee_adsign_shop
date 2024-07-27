const db = require('../connectdb.js')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  // res.send("register")
  const email = await req.body.email;
  const password = await req.body.password;
  //Check user if exists
  db.query("SELECT * FROM customer WHERE email = ?", email, async (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (data.length) {
      return res.status(409).json("Email already exists")
    }

    //Create a new user and encode
    const hashedpassword = await bcrypt.hash(password, 10);
    const fullName = await req.body.name + " " + req.body.lastname;
    const cusid = uuidv4();

    const cusdata = await [
      cusid,
      fullName,
      req.body.tel,
      req.body.address,
      hashedpassword,
      req.body.email,
    ]

    db.query("INSERT INTO customer VALUE (?)", [cusdata], async (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Profile has been created.");
    })

  })
}

const login = async (req, res) => {
  //res.send("login")
  // const {email,password} = await req.body
  db.query('SELECT * FROM customer WHERE email = ?', await [req.body.email], async (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (data.length === 0) {
      return res.status(200).json("User not found")
    }
      const checkPassword = bcrypt.compareSync(
        await req.body.password,
        data[0].password
      );

      if (!checkPassword)
        return res.status(400).json("Wrong password or username!");

      //Set token
      const token = jwt.sign({ id: data[0].id  }, "secretkey", {expiresIn:'1d'});

      const { password, ...others } = data[0];

      res.cookie("token", token, { httpOnly: true }).status(200).json(others);
  })
}

const logout = async (req, res) => {
  res.clearCookie("token", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out.")
}


module.exports = { login, register, logout };