const mysql = require('mysql');



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'instagran'
  });
   
  connection.connect();

  console.log("dB is connected");


  module.exports = connection;