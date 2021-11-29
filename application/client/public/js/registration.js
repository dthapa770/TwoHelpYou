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
 * File: registration.js
 * 
 * Description: Provides functionability to the registration page 
 *              such as field validaton and image posting.
 *****************************************************************************/

/**
 * For flash messages to report an error
 * (not fully implemented at this time)
 * @param input 
 * @param message 
 * @returns 
 */
function Error(input, message) {
	input.required = true;
	input.className = 'Error';
	input.title = message;
	return false;
}

/**
 * For flash message for success
 * (not fully implemented at this time)
 * @param input 
 * @returns 
 */
function Success(input) {
	input.className = 'Success';
	input.title = '';
	return true;
}

/**
 * Function to validate if username follows
 * required format
 * @param name 
 * @returns 
 */
function ValidateUser(name) {
	var first_character = name.value.charAt(0);
	var message = 'Username must:';

	if (first_character.match(/[a-zA-Z]/gi) == null) {
		message = message + '\n* Start with a character';
	}

	if (name.value.match(/[^a-zA-Z0-9]/g)) {
		message = message + '\n* Cannot have nonAlphaNumeric';
	}

	if (name.value.length < 3) {
		message = message + '\n* Be 3 or more characters';
	}

	if (message != 'Username must:') return Error(name, message);
	else return Success(name);
}

/**
 * Function to check if username follows
 * required format
 * @param name 
 * @returns 
 */
 function CheckUser(name) {
	var first_character = name.value.charAt(0);
	var message = 'Invalid! Username must:';

	if (first_character.match(/[a-zA-Z]/gi) == null) {
		message = message + '\n* Start with a character';
	}

	if (name.value.match(/[^a-zA-Z0-9]/g)) {
		message = message + '\n* Cannot have nonAlphaNumeric';
	}

	if (name.value.length < 3) {
		message = message + '\n* Be 3 or more characters';
	}

	if (message != 'Invalid! Username must:') return message;
	else return 'Username is valid';
}

/**
 * Function to validate email is compliant
 * Only allows @mail.sfsu.edu or @sfsu.edu)
 * @param email_to_add 
 * @returns 
 */
function ValidateEmail(email_to_add) {
	if (!email_to_add.value.match(/^[a-zA-Z0-9_.+-]+@(sfsu|mail.sfsu)\.edu$/)) {
		return Error(email_to_add, 'Does not Comply to email format');
	}
	return Success(email_to_add);
}

/**
 * Function to validate email is compliant
 * Only allows @mail.sfsu.edu or @sfsu.edu)
 * @param email_to_add 
 * @returns 
 */
function CheckEmail(email_to_add) {
	if (!email_to_add.value.match(/^[a-zA-Z0-9_.+-]+@(sfsu|mail.sfsu)\.edu$/)) {
		return 'Invalid! Email does not end with sfsu.edu or mail.sfsu.edu';
	}
	return 'Email is valid';
}
/**
 * Ensures that passowrds meets all requirements
 * @param password 
 * @returns 
 */
//  const togglePassword = document.querySelector('#togglePassword');
//  const password = document.querySelector('#password');

//  togglePassword.addEventListener('click', function (e) {
//     // toggle the type attribute
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     // toggle the eye / eye slash icon
//     this.classList.toggle('bi-eye');
// });
function ValidatePassword(password) {
	var message = 'Password does not contain:';

	if (password.value.length < 8) {
		message = message + '\n* 8 or more characters';
	}
	if (!password.value.match(/[a-z]/)) {
		message = message + '\n* A lowercase character';
	}
	if (!password.value.match(/[A-Z]/)) {
		message = message + '\n* An uppercase character';
	}
	if (!password.value.match(/[0-9]/)) {
		message = message + '\n* A number';
	}
	if (!password.value.match(/[(|/|*|-|+|!|@|#|$|^|&|*|)]/)) {
		message = message + '\n* A special character specified below:';
		message = message + '\n  * ( / * - + ! @ # $ ^ & * )';
	}

	if (message != 'Password does not contain:') return Error(password, message);
	else return Success(password);
}


/**
 * Checks that passowrds meets all requirements
 * @param password 
 * @returns 
 */

function CheckPassword(password) {
	var message = 'Password does not contain:';

	if (password.value.length < 8) {
		message = message + '\n* 8 or more characters';
	}
	if (!password.value.match(/[a-z]/)) {
		message = message + '\n* A lowercase character';
	}
	if (!password.value.match(/[A-Z]/)) {
		message = message + '\n* An uppercase character';
	}
	if (!password.value.match(/[0-9]/)) {
		message = message + '\n* A number';
	}
	if (!password.value.match(/[(|/|*|-|+|!|@|#|$|^|&|*|)]/)) {
		message = message + '\n* A special character specified below:';
		message = message + '\n  * ( / * - + ! @ # $ ^ & * )';
	}

	if (message != 'Password does not contain:') return message;
	else return 'Password is valid';
}

/**
 * Ensure that confirmation matches password
 * @param password 
 * @param confirm_password 
 * @returns 
 */
function ConfirmPassword(password, confirm_password) {
	if (password.value != confirm_password.value) {
		return Error(confirm_password, 'Password does not match Confirmation');
	} else {
		return Success(confirm_password);
	}
}

/**
 * Checks that confirmation matches password
 * @param password 
 * @param confirm_password 
 * @returns 
 */
 function CheckConfirmPassword(password, confirm_password) {
	if (password.value != confirm_password.value) {
		return 'Invalid! Password does not match';
	} else {
		return 'Passwords match';
	}
}
let username = document.getElementById('username');
/**
 * Listener for username validation
 * @param event 
 */
username.onchange = function(event) {
	document.getElementById('user_message').innerHTML = CheckUser(username);

};

let email_to_add = document.getElementById('email');
/**
 * Listener for email validation
 * @param event 
 */
email_to_add.onchange = function(event) {
	document.getElementById('email_message').innerHTML = CheckEmail(email_to_add);
};

let user_password = document.getElementById('register_password');
let user_confirm = document.getElementById('confirm_password');
/**
 * Listerner for password validation
 * @param event 
 */
user_password.onchange = function(event) {
	document.getElementById('password_message').innerHTML = CheckPassword(user_password);
	if (document.getElementById('confirm_password').value != '') {
		document.getElementById('confirm_message').innerHTML = CheckConfirmPassword(user_password, user_confirm);
	}
};

/**
 * Listener for password confirmation
 * @param event 
 */
user_confirm.onchange = function(event) {
	document.getElementById('confirm_message').innerHTML = CheckConfirmPassword(user_password, user_confirm);
};

let register_form = document.getElementById('register_page');
/**
 * Listener for form submission
 * @param event 
 * @returns 
 */
register_form.onsubmit = function(event) {
	if (!ValidateUser(username)) {
		alert('Fix User');
	} else if (!ValidatePassword(user_password)) {
		alert('Password does not comply');
	} else if (!ConfirmPassword(user_password, user_confirm)) {
		alert('Confirm does not match Password');
	} else if (!ValidateEmail(email_to_add)) {
		alert('Email address must have @sfsu.edu or @mail.sfsu.edu!');
	} else {
		return true;
	}
	event.preventDefault();
};

