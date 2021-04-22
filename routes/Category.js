const express = require('express')
const router = express.Router()
const database = require('../database/connect')
const _Date = new Date()

router.get('/', (req, res) => {
  getAll(res)
})

router.get('/:id', (req, res) => {
  getCatById(req.params.id, res)
})

router.post('/', async (req, res) => {
  const values = {
    $name: req.body.name,
    $created_at: new Date().toISOString(),
  }
  const doInsert = await insertIntoCat(values, res)

})

router.put('/update/:id', (req, res) => {
  const values = {
    $name: req.body.name,
    $updated_at: new Date().toISOString(),
    $id: req.params.id
  }

  updatedCatName(values, res)

})

router.delete('/:id' , (req,res) => {
  deleteCat(req.params.id);
  res.send(req.params)
})


const getCatById = (id, res) => {
  const query = 'SELECT * FROM categories WHERE id = $id'
  database.serialize(function () {
    let stmt = database.prepare(query, {$id: id})
    stmt.get((err, row) => {
      if (err === null && row !== undefined) {
        res.send({
          cat: row,
          error: err
        })
      }
      if (row === undefined) {
        res.send({
          cat: 'not found 404',

        })
      }
    })
  })
}
const updatedCatName = (values = {}, res) => {

  const query = 'UPDATE categories SET name = $name , updated_at = $updated_at WHERE id = $id'

  database.serialize(function () {

    let stmt = database.prepare(query, values, function (err) {

      if (err === null) {
        res.send({
          message: 'Category Updated successful',
          error: null,
          statement: this,
          values: values
        })
      } else {

        res.send({
          message: 'There is an error updating category',
          error: err,
          statement: this,
          values: values
        })
      }

    })

    //Run statement
    stmt.run()
    stmt.finalize()
  })
}
const insertIntoCat = (values = {}, res) => {

  let query = 'INSERT INTO categories (name , created_at) VALUES ($name , $created_at)'

  const _database = database.serialize(function () {


    database.run(query, values, function (err) {

      if (err === null) {
        res.json({
          message: 'Category Added successful',
          error: null,
          statement: this,
          values: values,
          id : this.lastID
        })
      } else {

        res.json({
          message: 'There is an error updating category',
          error: err,
          statement: this,
          values: values
        })
      }

    })

    // stmt.finalize()

  })

}
const getAll = (res) => {
  const query = 'SELECT * FROM categories'

  database.serialize(function () {
    database.all(query, function (err, row) {
      if (Array.isArray(row) && row.length) {
        res.json({
          message: 'Request complete',
          data: row,
          error: err
        })
      } else if (Array.isArray(row) && !row.length) {
        res.json({
          message: 'Request complete',
          data: [{
            message:"There is no data"
          }],
          error: err
        })

      }
    })

  })
}
const deleteCat = (catID) => {
    const query = 'DELETE FROM categories WHERE id = ?';

    database.serialize(function(){
      let stmt = database.prepare(query , [catID] , function(err) {
        console.log(err);
      });

      stmt.run();
      stmt.finalize();
    });
}

module.exports = router

// Ask about Request headers and Response headers ;