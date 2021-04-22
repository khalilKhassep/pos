const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const categoryRoute = require('./routes/Category')
const productRoutes = require('./routes/product');
const app = express()
app.use(cors())
app.use(bodyParser.json());


app.use('/cat', categoryRoute)
app.use('/product' , productRoutes);

app.listen(3333)