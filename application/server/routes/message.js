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
router.post('/create/:username', (req, res, next) => {
	if (!req.session.username) {
		ErrorPrint('Must be logged in to send message');
		res.redirect('/');
	} else {
		let message = req.body.message;
        let username = req.params.username;
		let userId = req.session.user_id;
		// let course_prefix = req.session.;
		// let course_postfix= req.session.;
		Create(userId, username, message,course_prefix,course_postfix)
			.then((was_successful) => {
				if (was_successful !== -1) {
					SuccessPrint(`message was sent to ${username}`);
				} else {
					ErrorPrint('message was not saved');
				}
                res.redirect('/');
			})
			.catch((err) => next(err));
	}
});

/**
 * Route to create form to send message to user.
 */
router.get('/:username', (req, res, next) => {
    let username= req.params.username;
    
    UserModel.GetUser(username)
    .then((results) => {
        if (results.length){
          let user = results[0];
          res.render('message', {current_user: user, title: `User: ${username}`});
        } else {
            ErrorPrint('Error, this is not the correct User profile.');
            req.session.save(function () {
                res.redirect('/');
            })
        }
    })
});

module.exports = router;
