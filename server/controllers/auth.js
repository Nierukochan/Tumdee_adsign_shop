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
      return res.status(400).json("THis user already exist")
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
      if (err) return res.status(500).json('server error');
      return res.status(200).json("Profile has been created.");
    })

  })
}

const empregister = async (req, res) => {

  const emp_id = req.body.emp_id;
    const password = req.body.password;
    const emp_name = req.body.emp_name;
    const emp_tel = req.body.emp_tel;
    const position_id = req.body.position_id;

    // Check if any of the required fields are missing
    // if (!emp_id || !password || !emp_name || !emp_tel || !position_id) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

  //Check user if exists
  db.query("SELECT * FROM personal WHERE emp_id = ?", emp_id, async (err, data) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (data.length) {
      return res.status(400).json("THis user already exist")
    }

    //Create a new user and encode
    const hashedpassword = await bcrypt.hash(password, 10);
    // const cusid = uuidv4();

    const empdata = [
        emp_id,
        emp_name,
        hashedpassword,
        emp_tel,
        position_id
    ]

    db.query("INSERT INTO personal VALUE (?)", [empdata], async (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Profile has been created.");
    })
  })

}

const emplogin = async (req, res) => {
  db.query('SELECT * FROM personal WHERE emp_id = ?', [req.body.emp_id], async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error', details: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "ID not found" }); 
    }

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    console.log(checkPassword);

    if (!checkPassword) {
      return res.status(400).json({ message: "Wrong password or ID!" });
    }

    // Set token
    const token = jwt.sign({ emp_id: data[0].emp_id }, "secretkey"); 

    const { password, ...others } = data[0];

    res.cookie("emptoken", token, { httpOnly: true }).status(200).json(others);
  });
};


const login = async (req, res) => {
  // res.send("login")
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

      //no cookie has stored in cookie storage
      if (!checkPassword)
        return res.status(400).json("Wrong password or username!");

      //Set token
      const token = jwt.sign({ cus_id: data[0].cus_id  }, "secretkey");

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

const getuser = async (req, res) => {
  
  const userID = req.user.cus_id; // or wherever the user ID is stored
    if (!userID) {
      return res.status(401).json('User ID not found');//its worked
    }

    db.query('SELECT c.* , a.* FROM customer c INNER JOIN address a ON c.cus_id = a.cus_id WHERE c.cus_id = ? GROUP BY a.address_id',[userID], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
}

  const getemp = async (req, res) => {
     
    const emp_id = req.emp.emp_id
    // console.log(emp_id)

    if (!emp_id) {
      return res.status(401).json('Emp ID not found');//its worked
    }

    /*if (position !== '1') {
      return res.status(401).json('No permision');//its worked
    }*/

      db.query('SELECT * FROM personal WHERE emp_id =?',[emp_id],(err, data) => {
        if(err) return res.status(500).json(err)
        if(data[0].position_id !== '1') return res.status(401).json('No permision')
          db.query('SELECT * FROM personal', (err, row) => {
            if(err) return res.status(500).json(err)

            /*const { password, ...others } = row*/
            const result = row.map(({ password, ...otherFields }) => otherFields)

            return res.status(200).json(result)
          })
      })
}

 const getposition = async (req, res) => {
    
    const qry = `SELECT * FROM position_table`

    db.query(qry,(err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
 }


module.exports = { login, register, logout, getuser, emplogin, empregister, getemp, getposition}