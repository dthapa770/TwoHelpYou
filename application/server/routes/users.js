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
var GetAllUserPost = require('../middleware/post_middleware').GetAllUserPost;
const { body, validationResult} = require('express-validator');
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const UserError = require('../helpers/error/user_error');
const { SaveSession } = require('../utility/promise');

//var crypto=require('crypto');

//validation rules for registration
const UserValidationRules = () => {
	return [
		body('username').notEmpty().isAlphanumeric(), 

		body('email').matches(/^[a-zA-Z0-9_.+-]+@(sfsu|mail.sfsu)\.edu$/), 

		body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z*-+-./!@#$()^&*]{8,}$/)
	]
}

//checks validation for registration
const Validate = (req, res, next) => {
	const errors = validationResult(req)
	if(errors.isEmpty()){
		return next()
	}else{
		// req.flash('error', "Enter Valid information"); 
		ErrorPrint("Validation Failed!")
		res.redirect('/registration'); 
	}
}

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/**
 * route for user registration
 */
router.post('/register', UserValidationRules(), Validate, (req, res, next) => {
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
router.post('/login', async (req, res, next) => {
	var username = req.body.user_name;
	var password = req.body.password;
	let logged_user_id = await UserModel.Authenticate(username, password);
	try {
		if (logged_user_id > 0) {
			SuccessPrint(`User ${username} is logged in`);
			let messages = await UserModel.GetUserMessageCount(logged_user_id);
			if (messages.user_id > 0) {
				req.session.dashboard_first_name = messages.first_name;
				req.session.dashboard_message_count = messages.messages;
			}
			let posts = await UserModel.GetUserPostCount(logged_user_id);
			if (posts.user_id > 0) {
				req.session.dashboard_post_count = posts.posts;
			}
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

/**
 * Route for user logout
 */
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

/**
 * Get User Profile
 */
router.get('/:username', GetAllUserPost, (req,res,next) => {
  let username = req.params.username; 

  UserModel.GetUser(username)
  .then((results) => {
	  if (results.length){
		let user = results[0];
		res.render('user_profile', {current_user: user, title: `User: ${username}`});
	  } else {
		  ErrorPrint('Error, this is no the correct User profile.');
		  req.session.save(function () {
			  res.redirect('/');
		  })
	  }
  })
})

module.exports = router;