const mysql = require('mysql2')
const bcrypt = require('bcrypt')

const connectdb = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'TumDee_DB',
  password: '',
});

module.exports = connectdb