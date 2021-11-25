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
 * File: message.js
 * 
 * Description: deals with sending message to the user
 *              
 *****************************************************************************/

var express = require('express');
var router = express.Router();
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const { Create } = require('../models/message_model');
var UserModel = require('../models/user_model');

/**
 * route to send message to user.
 */
 router.post('/create/:username/:post_id/:course_prefix/:course_postfix', (req, res, next) => {
	if (!req.session.username) {
		ErrorPrint('Must be logged in to send message');
		res.redirect('/');
	} else {
		let message = req.body.message;
        let username = req.params.username;
		let userId = req.session.user_id;
		let course_prefix = req.params.course_prefix;
		let course_postfix = req.params.course_postfix;
		let post_id = req.params.post_id;
        if(message &&username &&post_id &&course_prefix &&course_postfix){
			Create(userId, username, message,course_prefix,course_postfix)
				.then((was_successful) => {
					if (was_successful !== -1) {
						SuccessPrint(`message was sent to ${username}`);
					} else {
						ErrorPrint('message was not saved');
					}
					res.redirect('/conformation');
				})
				.catch((err) => next(err));
		}else {
			res.redirect(`/message/${username}/${post_id}/${course_prefix}/${course_postfix}`)
		}
	}
});

/**
 * Route to create form to send message to user.
 */
 router.get('/:username/:post_id/:course_prefix/:course_postfix', (req, res, next) => {
    let username= req.params.username;
	let post_id = req.params.post_id;
	let course_prefix = req.params.course_prefix;
	let course_postfix = req.params.course_postfix;
	let sender = req.session.username;
    UserModel.GetUser(username)
    .then((results) => {
        if (results.length){
          let user = results[0];
          res.render('message', {current_user: user, post_id:post_id, course_prefix: course_prefix, course_postfix:course_postfix, sender_username:sender, title: `User: ${username}`});
        } else {
            ErrorPrint('Error, this is not the correct User profile.');
            req.session.save(function () {
                res.redirect('/');
            })
        }
    })
});

module.exports = router;
