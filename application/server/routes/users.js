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

const userError =require("../helpers/error/user_error");
const {SuccessPrint,ErrorPrint}=require("../helpers/debug/debug_printers");

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
          return UserModel.create(first_name,last_name,username, password, email);
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
          SuccessPrint("Users.js -->User was created!!");
          res.redirect('/login');
      }
  })
  .catch((err) => {
    ErrorPrint("user cannot be made", err);
          if (err instanceof UserError) {
        ErrorPrint(err.getMessage());
              //req.flash('error', err.getMessage());
              res.status(err.getStatus());
              res.redirect(err.getRedirectURL());
          } else {
              next(err);
          }
      });
  });

router.post('/login',(req,res,next) => {
  var username=req.body.user_name;
  var password=req.body.password;
      UserModel.Authenticate(username,password)
          .then((loggedUserId)=>{
              if(loggedUserId > 0){
                  SuccessPrint(`User ${username} is logged in`);
                  req.session.username=username;
                  req.session.user_id=loggedUserId;
                  res.locals.logged = true;
                  res.redirect("/");
              }else{
                  throw new userError("Invalid username and/or password!","/login",200);
              }
          })
          .catch((err) => {
        ErrorPrint("User login failed!!");
              if (err instanceof userError){
            ErrorPrint(err.getMessage());
                  res.status(err.getStatus());
                  res.redirect('/login');
              }
              else{
                  next(err);
              }
          });
  });
  

module.exports = router;
