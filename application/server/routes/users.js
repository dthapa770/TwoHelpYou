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
var sharp = require('sharp');
var router = express.Router();
var UserModel = require('../models/user_model');
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const UserError = require('../helpers/error/user_error');
const { SaveSession } = require('../utility/promise');

//var crypto=require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;

	let profile_picture = req.files.profile_picture;

	try {
		if (!res.locals.logged) {
			SuccessPrint('User is not logged in.');
		} else throw new UserError('User is logged in', '/register', 200);
		var allowed_image = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
		if (!allowed_image.exec(profile_picture.name)) {
			throw new UserError('wrong file type', '/register', 200);
		}
	} catch (err) {
		console.log('error');
		ErrorPrint('Bad image');
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

	try {
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.');
		}
		image_name = username + '_' + Date.now() + '_' + profile_picture.name;
		profile_picture.mv('../client/public/images/uploads/' + image_name, (err) => {
			if (err) {
				throw new UserError('Image could not be uploaded');
			} else {
				SuccessPrint('Img was uploaded');
			}
		});
		sharp(req.files.profile_picture.data)
			.resize(200)
			.toFile('../client/public/images/thumbnails/' + image_name)
			.then(function(new_file_info) {
				SuccessPrint('Image Resized');
			})
			.catch(function(err) {
				throw new UserError('Image could not be thumbnailed');
			});
	} catch (err) {
		console.log('error');
		ErrorPrint('Bad post data');
		if (err instanceof PostError) {
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
				ErrorPrint(err.getMessage());
				//req.flash('error', err.getMessage());
				res.status(err.getStatus());
				res.redirect(err.getRedirectURL());
			} else {
				next(err);
			}
		});
});

router.post('/login', async (req, res, next) => {
	var username = req.body.user_name;
	var password = req.body.password;
	let logged_user_id = await UserModel.Authenticate(username, password);
	try {
		if (logged_user_id > 0) {
			SuccessPrint(`User ${username} is logged in`);
			req.session.username = username;
			req.session.user_id = logged_user_id;
			res.locals.logged = true;
			await SaveSession(req.session);
			res.redirect('/');
		} else {
			throw new UserError('Invalid username and/or password!', '/login', 200);
		}
	} catch (err) {
		ErrorPrint('User login failed!!');
		if (err instanceof UserError) {
			ErrorPrint(err.GetMessage());
			res.status(err.GetStatus());
			res.redirect('/login');
		} else {
			next(err);
		}
	}
});

router.post('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			ErrorPrint("session couldn't be destroyed");
			next(err);
		} else {
			SuccessPrint('session was destroyed');
			res.clearCookie('csid');
			res.json({ status: 'OK', message: 'user is logged out' });
		}
	});
});

module.exports = router;
