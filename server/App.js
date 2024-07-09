const express = require('express')

const connectdb = require('./connectdb.js')
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');

const PORT = 2000;
const app = express();

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

// routes
app.use("/api/users",userRoutes)
app.use('/api/authenticate',authRoutes)


app.listen(2000, () =>
  console.log('Listening on Port', PORT)
)

