const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const categoryRoute = require('./routes/Category')
const productRoutes = require('./routes/product');
const app = express()

global.__basedir = __dirname;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use('/cat', categoryRoute)
app.use('/product' , productRoutes);
app.use((req,res,next) => {
    res.status(404).send('Page not found')
});

app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).send('Something Broke');
})
//console.log(__dirname);
app.listen(3333)