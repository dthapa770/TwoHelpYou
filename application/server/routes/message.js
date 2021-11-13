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
 * File: frontend.js
 * 
 * Description: 
 *              
 *****************************************************************************/

 var express = require('express');
 var router = express.Router();
 const {SuccessPrint, ErrorPrint} = require("../helpers/debug/debug_printers");
 const {Create} = require('../models/message_model');
 
 router.post('/create',(req,res,next) =>{
     console.log(req.session);
     if(!req.session.username){
         ErrorPrint("Must be logged in to send message");
         res.json({
             code: -1,
             status: "danger",
             message: "Must be logged in to send message"
         })
     } else {
         let {message,recieverId} = req.body;
         let username = req.session.username;
         let userId = req.session.user_id;
         Create(userId,recieverId,message)
         .then((was_successful) =>{
             if ( was_successful !== -1){
                 SuccessPrint(`message was sent from ${username}`);
                 res.json({
                     code: 1,
                     status: "success",
                     message: "message created",
                     username,
                     
                 })
             } else{
                 errorPrint('message was not saved');
                 res.json({
                     code: -1,
                     status: "danger",
                     message: "message was not created"
                 })
             }
         }).catch((err) => next(err));
     }
 })
 module.exports = router;