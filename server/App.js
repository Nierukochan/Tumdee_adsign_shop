const express = require('express')
const cors = require('cors');
const connectdb = require('./connectdb.js')
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const cartRoutes = require('./routes/cart.js')
const productRoutes = require('./routes/product.js')
const cookieParser = require('cookie-parser')
const PORT = 2000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.static('public'))

connectdb.connect((err) => {
  if(err) return res.status(500).send('connection has an error')
  console.log('Connected!!')
})

// app.get('/', (req, res) => {
//   connectdb.query('SELECT cus_name,cus_address FROM Customer ORDER BY cus_id ASC', (err, rows) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(rows)
//     }
//   }) 
// })

// routes
app.use("/api/users",userRoutes)
app.use("/api/authenticate",authRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/product",productRoutes)


app.listen(2000, () =>
  console.log('Listening on Port', PORT)
)

