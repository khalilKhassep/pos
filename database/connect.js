const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database('./database/db.db' ,sqlite3.OPEN_READWRITE , (err) => {
  if (err) {
    console.log(err.message);
  }else{
    console.log("Connected")
  }
});

module.exports = database;