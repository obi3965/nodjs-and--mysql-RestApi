
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'restfull_api'
  });

connection.connect((err)=>{
    if(err) throw err
    console.log('mysql is connected...')
})

module.exports = connection;