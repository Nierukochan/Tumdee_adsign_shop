const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')


const PORT = 2000;
const app = express();

const connectdb = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'TumDee_DB',
  password: '',
});

connectdb.connect();

app.get('/', (req, res) => {
  connectdb.query('SELECT cus_name,cus_address FROM Customer ORDER BY cus_id ASC', (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows)
    }
  })
})


app.listen(2000, () =>
  console.log('Listening on Port', PORT)
)