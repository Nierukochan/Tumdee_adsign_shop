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
      return res.status(200).json("Log in has been successed")
    }

    try {
        const checkPassword = bcrypt.compareSync(
        await req.body.password,
        data[0].password
      );
  
      if (!checkPassword)
        return res.status(400).json("Wrong password or username!");
  
      const token = jwt.sign({ email: data[0].email, name: data[0].cus_name, tel: data[0].cus_tel }, "secretkey");
  
      const { password, ...others } = data[0];

      res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json(others);
    } catch (bcryptErr) {
      console.error('Error during password comparison:', bcryptErr);
      return res.status(500).json("password comparison has been failed.");
    }
  })
}

const logout = async (req, res) => {
  res.send('logout')
}


module.exports = { login, register, logout };