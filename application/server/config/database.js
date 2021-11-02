/******************************************************************************
 * Class: CSC 0648-03 Software Engineering Fall 2021
 * Team: 1
 * Name:  Justin Lam
 *        Aviral Puri
 *        Dinesh Thapa
 *        Kurt D Resayo
 *        Wesley J Xu
 *        Chung Hei Fong
 * 
 * File: database.js
 * 
 * Description: database configurations
 *****************************************************************************/

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