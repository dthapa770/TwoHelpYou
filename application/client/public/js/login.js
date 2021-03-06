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
 * File: login.js
 * 
 * Description: Provides functionability to the registration page 
 *              such as field validaton and image posting.
 *****************************************************************************/

(function() {
	'use strict';
	var forms = document.querySelectorAll('.requires-validation');
	var originalURL= window.location.pathname;	
	Array.prototype.slice.call(forms).forEach(function(form) {
		form.addEventListener(
			'submit',
			function(event) {
				if (!form.checkValidity()) {
					alert("Invalid login information");
					event.preventDefault();
					event.stopPropagation();	
				}
				document.login_page_name.action = "/users/"+originalURL;
				form.classList.add('was-validated');
			},
			false
		);
	});
})();

/**
 * Function to check if username follows
 * required format
 * @param name 
 * @returns 
 */
 function LogCheckUser(name) {
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
 * Checks that passowrds meets all requirements
 * @param password 
 * @returns 
 */

 function LogCheckPassword(password) {
	var message = 'Password does not meet requirements:';

	if (password.value.length < 8) {
		message = message + '*8 or more characters ';
	}
	if (!password.value.match(/[a-z]/)) {
		message = message + '<br> *lowercase character ';
	}
	if (!password.value.match(/[A-Z]/)) {
		message = message + '<br> *uppercase character ';
	}
	if (!password.value.match(/[0-9]/)) {
		message = message + '*number';
	}
	if (!password.value.match(/[(|/|*|-|+|!|@|#|$|^|&|*|)]/)) {
		message = message + '*special character';
	}

	if (message != 'Password does not meet requirements:') return message;
	else return 'Password meets requirements';
}

let login_username = document.getElementById('user_name');
/**
 * Listener for username validation
 * @param event 
 */
login_username.onchange = function(event) {
	if(LogCheckUser(login_username) == 'Username is valid') {
	document.getElementById('login_user_message').innerHTML = LogCheckUser(login_username);
	document.getElementById('login_user_message').style.color = 'green';
	} else {
		document.getElementById('login_user_message').innerHTML = LogCheckUser(login_username);
		document.getElementById('login_user_message').style.color = 'red';
	}

};

let login_password = document.getElementById('password');

/**
 * Listerner for password validation
 * @param event 
 */

login_password.onchange = function(event) {
	if(LogCheckPassword(login_password) == 'Password meets requirements') {
		document.getElementById('login_password_message').innerHTML = LogCheckPassword(login_password);
		document.getElementById('login_password_message').style.color = 'green';
	} else {
		document.getElementById('login_password_message').innerHTML = LogCheckPassword(login_password);
		document.getElementById('login_password_message').style.color = 'red';
	}
};