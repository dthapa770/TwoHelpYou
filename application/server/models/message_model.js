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
 * Description: Deals with messages.
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

module.exports = MessageModel;
