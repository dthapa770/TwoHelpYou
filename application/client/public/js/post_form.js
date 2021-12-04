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
 * Description: Provides functionability to the post page 
 *              such as field validaton and submission
 *****************************************************************************/

/**
 * Function to check if course postifx follows
 * required format
 * @param input 
 * @returns 
 */
 function CheckCourse(input) {
	var regEx = /^[0-9]{3}$/;
	var message = 'Invalid! Course number must:';

	if (input.value.match(regEx) == null) {
		message = message + '* Be 3 or more characters';
	}

	if (message != 'Invalid! Course number must:') return message;
	else return 'Course number is valid';
};

/**
 * Function to check if course postifx follows
 * required format
 * @param input 
 * @returns 
 */
 function CheckAvailability(input) {
	var message = '';
//check if input length is under 40 characters
	if (input.value.length > 40) {
		message = message + 'Invalid! Must Be less than 40 characters';
	}

	if (message != '') return message;
	else return "Message length is under 40 characters";
};

let course_postfix = document.getElementById('course_postfix');
/**
 * Listener for course_postfix validation
 * @param event 
 */
course_postfix.onchange = function(event) {
	if (CheckCourse(course_postfix) != 'Course number is valid') {
		document.getElementById('course_postfix_message').innerHTML = CheckCourse(course_postfix);
		document.getElementById('course_postfix_message').style.color = 'red';
	} else {
		document.getElementById('course_postfix_message').innerHTML = CheckCourse(course_postfix);
		document.getElementById('course_postfix_message').style.color = 'green';
	}

};

let availability = document.getElementById('availability');
/**
 * Listener for availability validation
 * @param event
 */
availability.onchange = function(event) {
	if (CheckAvailability(availability) != 'Message length is under 40 characters') {
		document.getElementById('availability_message').innerHTML = CheckAvailability(availability);
		document.getElementById('availability_message').style.color = 'red';
	}
};