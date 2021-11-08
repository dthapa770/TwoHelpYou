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
 * Description: deals with routing to implement functions for users
 *****************************************************************************/

var express = require('express');
var router = express.Router();
var UserModel = require('../models/user_model');
var PhotoModel = require('../models/photo_model');
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const UserError = require('../helpers/error/user_error');

//var crypto=require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/**
 * route for user registration
 */
router.post('/register', (req, res, next) => {
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	let profile_picture;

	try {
		if (!res.locals.logged) {
			SuccessPrint('User is not logged in.');
		} else throw new UserError('User is logged in', '/', 200);
	} catch (err) {
		console.log('error');
		if (err instanceof UserError) {
			ErrorPrint(err.GetMessage());
			// req.flash('Error', err.getMessage());
			res.status(err.GetStatus());
			req.session.save(function() {
				res.redirect(err.GetRedirectURL());
			});
		} else {
			next(err);
		}
		return;
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		// utilize default
		image_name = "default_photo.jpg";
	} else {
		// Grabs photo from client and uploads the image
		try {
			profile_picture = req.files.profile_picture;
			image_name = PhotoModel.UploadPhoto(username, profile_picture);
			if (image_name == "Error") {
				throw new UserError('Issue with photo file.', '/register', 200);
			}
		} catch (err) {
			console.log('error');
			ErrorPrint("Cannot handle image properly.")
			if (err instanceof UserError) {
				ErrorPrint(err.GetMessage());
				// req.flash('Error', err.getMessage());
				res.status(err.GetStatus());
				req.session.save(function() {
					res.redirect(err.GetRedirectURL());
				});
			} else {
				next(err);
			}
			return;
		}
		SuccessPrint("Photos moved to correct place.")
	}

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
				//req.flash('error', err.getMessage());
				res.status(err.GetStatus());
				res.redirect(err.GetRedirectURL());
			} else {
				next(err);
			}
		});
});

/**
 * Route for user login
 */
router.post('/login', (req, res, next) => {
	var username = req.body.user_name;
	var password = req.body.password;
	UserModel.Authenticate(username, password)
		.then((logged_user_id) => {
			if (logged_user_id > 0) {
				SuccessPrint(`User ${username} is logged in`);
				req.session.username = username;
				req.session.user_id = logged_user_id;
				res.locals.logged = true;
				res.redirect('/');
			} else {
				throw new userError('Invalid username and/or password!', '/login', 200);
			}
		})
		.catch((err) => {
			ErrorPrint('User login failed!!');
			if (err instanceof userError) {
				ErrorPrint(err.getMessage());
				res.status(err.getStatus());
				res.redirect('/login');
			} else {
				next(err);
			}
		});
});

module.exports = router;
