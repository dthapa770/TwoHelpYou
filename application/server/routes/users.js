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
 * File: user.js
 * 
 * Description: temporary page that will deal with users.
 *****************************************************************************/

var express = require('express');
var router = express.Router();

var db = require('../config/database');

//var crypto=require('crypto');
var UserModel = require('../models/user_model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',(req,res,next) =>{
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

     UserModel.usernameExists(username)
      .then((userDoesNameExists) =>{
          if(userDoesNameExists){
              throw new UserError(
                  "Registration Failed:Username already exist!!",
                  "/registration",
                  200
              );
          } else {
              return UserModel.emailExists(email);
          }
  })
  .then((emailDoesExists) => {
      if(emailDoesExists){
          throw new UserError(
              "Registration Failed:Email already exist!!",
              "/registration",
              200
          );
      }else{
          return UserModel.create(username, password, email);
      }
  })
  .then((createUserId) => {
      if (createUserId < 0) {
          throw new UserError(
              "Server Error: User cannot be created",
              "/registration",
              500
          );
      } else {
          successPrint("Users.js -->User was created!!");
          res.redirect('/login');
      }
  })
  .catch((err) => {
          errorPrint("user cannot be made", err);
          if (err instanceof UserError) {
              errorPrint(err.getMessage());
              //req.flash('error', err.getMessage());
              res.status(err.getStatus());
              res.redirect(err.getRedirectURL());
          } else {
              next(err);
          }
      });
  });


module.exports = router;
