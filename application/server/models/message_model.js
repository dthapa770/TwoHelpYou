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
 * File: message_model.js
 * 
 * Description: Insert query for the message sent by the user
 *              
 *****************************************************************************/

var db=require("../config/database");
const MessageModel= {};


MessageModel.Create = (sender,receiver,message) =>{
    let baseSQL = `INSERT INTO message (time, message, receiver_id,sender_id) VALUES (now(),?,(SELECT user_id FROM user WHERE username = ?),?);`
    return db.query(baseSQL,[message,receiver,sender])
    .then (([results,fields]) =>{
        if(results && results.affectedRows){
            return Promise.resolve(results);
        } else {
            return Promise.resolve(-1);
        }

    })
    .catch((err) => Promise.reject(err));
}

MessageModel.GetMessage = (user_id) =>{
    let baseSQL= `SELECT * FROM message WHERE receiver_id= ?;`
    return db.query(baseSQL, [user_id])
        .then (([results,fields]) =>{
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));

}
module.exports = MessageModel;