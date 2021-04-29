const path = require('path');
const express = require('express')
const router = express.Router()
const database = require('../database/connect');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../', 'public/uploads/product/img');




router.get('/', (req, res) => {
  console.log('product page router is connect5ed')
});


router.post('/', async (req, res) => {
 
  let response = {
    error: null,
    message: 'No initaial values given to query yet',
  }
 // Initlize values from request 
 const values = makeValues(req.body);
 const query = queryBuilder(values);

 //generate path with file name [name follow the pattren product_(product-code)];
 const filePath = `${uploadPath}/product_${values.$code}`;
 const file     = req.files.file_img
 const encoding = 'base64';
 //store file to path
 storeFile(filePath , file , encoding , function(err)  {
  console.log(err);
 }); 
  
  await database.serialize(function () {
     // Prepare statment to be excuted to database
    let stmt = database.prepare(query, function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error preparing statement'
        response.query = query
        res.send(response)

      }
    })
    // Bind values to query after preparing
    stmt.bind(values, function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error binding values to query. Please check query params'
        response.values = values
        res.send(response)

      }
    })
    //Run statmen to database 
    stmt.run(function (err) {
      if (err !== null) {
        response.error = err
        response.message = 'There was an error excuting stateemnt'
        response.$this = this
        res.send(response)

      } else if (err === null) {
        response.error = err
        response.message = 'Query statement completed'
        response.$this = this
        res.send(response)

      }
    })//end stmt run

  }); //end databse serialize;

})


const makeValues = (values) => {
  if(!Object.entries(values).length) throw new Error('Argnent is not an object' + values) 
  const obj = {};
  const entries = Object.entries(values);
  entries.forEach(element => {
    let propValue = element[1];
    let propName = element[0].toString();
    propName = "$"+propName; // generate prop names in order to bind to query
    obj[propName] = propValue;
  });
  return obj;
}

const queryBuilder = (values , table = 'product') => {
   
  // values comes as object peers of key = > value
   // Get object keys as coulmns names 
   // get object keys value as coulumns valus
   // bind it to query string 
   //Terms for query string 
   /**
    * 1 coulmns followed by a cooma (,)
    * 2  values in order to bind to query follow the dollar sign at the begining of key name 
    */
   
   const keys  = Object.keys(values); // Keys for values
   
   // remove $ sign from keys by cloning keys array to a new array holding keys
   const formatedValuesArr = keys.map(key => {
    return key.toString().replace("$", '')
   })
 
   // generate query string from formatedValues
  const columns = `(${formatedValuesArr.join(',')})`; 
  const colValues  = `(${keys.join(',')})`;
  
  
  //console.log(`INSERT INTO ${table} ${columns} VALUES ${colValues}`)
  return `INSERT INTO ${table} ${columns} VALUES ${colValues}`;

 }

function storeFile(path, file, encoding, callback) {
  // If no file system require it
  if (!fs) {
    const fs = require('fs');
  }
  const buffer    = file.data
  const mimetype  = file.mimetype;
  const extention = mimetype.match('/(.*)')[1];
  path = `${path}.${extention}`; 
  // write file to system
  return fs.writeFile(path, buffer, encoding, callback);

}


module.exports = router;
