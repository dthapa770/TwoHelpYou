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
 * Description: User based route exections
 *****************************************************************************/

var express = require('express');
var router = express.Router();
var UserModel = require('../models/user_model');
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const UserError = require('../helpers/error/user_error');

//var crypto=require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/**
 * User registration route.
 */
router.post('/register', (req, res, next) => {
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	UserModel.UsernameExists(username)
		.then((user_name_exists) => {
			if (user_name_exists) {
				throw new UserError('Registration Failed:Username already exist!!', '/registration', 200);
			} else {
				return UserModel.EmailExists(email);
			}
		})
		.then((email_exists) => {
			if (email_exists) {
				throw new UserError('Registration Failed:Email already exist!!', '/registration', 200);
			} else {
				return UserModel.Create(first_name, last_name, username, password, email, image_name);
			}
		})
		.then((create_user) => {
			if (create_user < 0) {
				throw new UserError('Server Error: User cannot be created', '/registration', 500);
			} else {
				SuccessPrint('Users.js -->User was created!!');
				res.redirect('/login');
			}
		})
		.catch((err) => {
			ErrorPrint('user cannot be made', err);
			if (err instanceof UserError) {
				ErrorPrint(err.GetMessage());
				//req.flash('error', err.GetMessage());
				res.status(err.GetStatus());
				res.redirect(err.GetRedirectURL());
			} else {
				next(err);
			}
		});
});

module.exports = router;
