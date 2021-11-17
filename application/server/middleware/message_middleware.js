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
 * File: message_middleware.js
 * 
 * Description: middleware between model and routes
 *****************************************************************************/

 var MessageModel = require('../models/message_model');
 const MessageMiddleware = {}

MessageMiddleware.GatAllUserMessages = async function(req,res,next) {
    try {
        let results = await MessageModel.GetUserMessages(req.session.user_id);
        res.locals.results = results;
        if (results.length == 0) {
            console.log("Error getting messages");
        }
        next();
    } catch(err) {
        next(err);
    }
}

module.exports = MessageMiddleware;