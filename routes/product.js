const express = require('express')
const router = express.Router()
const database = require('../database/connect')

router.get('/', (req, res) => {
  console.log('product page router is connect5ed')
})

router.post('/', async (req, res) => {
  const values = {
    $code: req.body.code,
    $category_id: req.body.category_id,
    $name: req.body.name,
    $description: req.body.description,
    $raw_price: req.body.raw_price,
    $price: req.body.price,
    $stock_count: req.body.stock_count,
    $color: req.body.color,
    $exp_date: req.body.exp_date,
    $img: req.body.img
  }

  let response = {
    error: null,
    message: 'No initaial values given to query yet',
    values: values
  }
  const query = 'INSERT INTO product (' +
    'code,category_id,name,description,raw_price,price,stock_count,color,exp_date,img)' +
    'VALUES ($code,$category_id,$name,$description,$raw_price,$price,$stock_count,$color,$exp_date,$img)'

  await database.serialize(function () {
    let stmt = database.prepare(query, function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error preparing statement'
        response.query = query
        res.send(response)

      }
    })
    stmt.bind(values, function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error binding values to query. Please check query params'
        response.values = values
        res.send(response)

      }
    })
    stmt.run(function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error excuting statemnt'
        response.$this = this
        res.send(response)

      } else if (err === null) {
        response.error = err
        response.message = 'Query statment completed'
        response.$this = this
        res.send(response)

      }
    })//end stmt run

  }) //end databse serialize;

})

router.put('/:id', (req, res) => {

})

const createProduct = () => {

}

module.exports = router