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
 * File: mesage_model.js
 * 
 * Description: Insert query for the message sent by the user
 *****************************************************************************/

var db = require('../config/database');
var MessageModel = {};

/**
 * Grabs the queries of all messages sent to the user.
 * @param user_id 
 * @returns messages sent to user
 */
MessageModel.GetUserMessages = (user_id) => {
	let baseSQL = `select u.username, m.message, m.time, m.message_id
                    from user u, message m
                    where u.user_id = m.sender_id and m.receiver_id = ?;`;
	return db
		.execute(baseSQL, [ user_id ])
		.then(([ results, fields ]) => {
			return Promise.resolve(results);
		})
		.catch((err) => Promise.reject(err));
};

/**
 * Inserts Message into the database.
 * @param sender 
 * @param receiver 
 * @param message 
 * @returns 
 */
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

/**
 * Grabs all message data for recipent of message
 * @param user_id 
 * @returns 
 */
MessageModel.GetMessage = (user_id) =>{
    let baseSQL= `SELECT * FROM message WHERE receiver_id= ?;`
    return db.query(baseSQL, [user_id])
        .then (([results,fields]) =>{
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));

}

module.exports = MessageModel;
