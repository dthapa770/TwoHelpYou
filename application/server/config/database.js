const mysql= require("mysql2");

const pool = mysql.createPool({

    host:'3.17.38.143',
    port: '3306',
    user: 'team1',
    password:'CSC648Team1!!',
    database: 'twohelpyouDB',
    connectionLimit:50,
    debug:false,

});


const promisePool=pool.promise(); // For Promise Use
module.exports=promisePool;