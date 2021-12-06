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
		message = message + '* Be 3 or more digits';
	}

	if (message != 'Invalid! Course number must:') return message;
	else return 'Course number is valid';
};


let course_postfix = document.getElementById('course_postfix');
/**
 * Listener for course_postfix validation
 * @param event 
 */
course_postfix.onchange = function (event) {
	if (CheckCourse(course_postfix) != 'Course number is valid') {
		document.getElementById('course_postfix_message').innerHTML = CheckCourse(course_postfix);
		document.getElementById('course_postfix_message').style.color = 'red';
	} else {
		document.getElementById('course_postfix_message').innerHTML = CheckCourse(course_postfix);
		document.getElementById('course_postfix_message').style.color = 'green';
	}

};

//regex to validate day and time input format: 3 alphabetical characters, hyphen, 3 alphabetical characters, space, 1 number, 2 alphabetical characters , hyphen, 1 number, 2 alphabetical characters
let time_regex = /^[a-zA-Z]{3}-[a-zA-Z]{3} [0-9]{1}[a-zA-Z]{2}-[0-9]{1}[a-zA-Z]{2}$/;



/**
 * Function to check if availability follows
 * required format
 * @param val
 * @returns 
 */
function ValidateAvailavility(val) {

	// Strict entry restriction
	// if (val.value.match(/^[a-zA-Z]{3}-[a-zA-Z]{3} [0-9]{1}[a-zA-Z]{2}-[0-9]{1}[a-zA-Z]{2}$/g) != null) {
	if (val.value.length > 3) {
		console.log("valid");
		availability.style.border = "1px solid green";
		return true;
	} else {
		console.log("invalid");
		availability.style.border = "1px solid red";
		return false;
	}
}

//availability event listener
let availability = document.getElementById('availability2');
availability.onchange = function (event) {
//check that input matches regex
	ValidateAvailavility(availability);
};

//on submit validate inputs
let post_form = document.getElementById('post_page');
post_form.onsubmit = function (event) {
	if(!ValidateAvailavility(availability)) {
		return false;
	}else {
		return true;
	}
	event.preventDefault();
};

/**
 * Below is js for version 2 of post form that is meant
 * to automate the entry instead of text entry.
 */

// //get days checkboxes
// let mon = document.getElementById('monday');
// let tue = document.getElementById('tuesday');
// let wed = document.getElementById('wednesday');
// let thurs = document.getElementById('thursday');
// let fri = document.getElementById('friday');
// let sat = document.getElementById('saturday');
// let sun = document.getElementById('sunday');

// //get start times
// let start_time_mon = document.getElementById('monday_time');
// let start_time_tue = document.getElementById('tuesday_time');
// let start_time_wed = document.getElementById('wednesday_time');
// let start_time_thurs = document.getElementById('thursday_time');
// let start_time_fri = document.getElementById('friday_time');
// let start_time_sat = document.getElementById('saturday_time');
// let start_time_sun = document.getElementById('sunday_time');

// //get duration elements
// let duration_mon = document.getElementById('duration_1');
// let duration_tue = document.getElementById('duration_2');
// let duration_wed = document.getElementById('duration_3');
// let duration_thurs = document.getElementById('duration_4');
// let duration_fri = document.getElementById('duration_5');
// let duration_sat = document.getElementById('duration_6');
// let duration_sun = document.getElementById('duration_7');


// //event listener for days checkboxes
// // for (let i = 0; i < days.length; i++) {
// // 	days[i].checked = function (event) {
// // 		if (days[i].checked) {
// // 			start_times[i].style.display = "block";
// // 		} else {
// // 			start_times[i].style.display = "none";
// // 		}
// // 	};
// // }
// //if checkbox is checked display time input
// mon.onclick = function (event) {
// 	if (mon.checked) {
// 		start_time_mon.style.display = "block";
// 		duration_mon.style.display = "block";
// 		start_time_mon.required = true;
// 		duration_mon.required = true;
// 	} else {
// 		start_time_mon.style.display = "none";
// 		duration_mon.style.display = "none";
// 		start_time_mon.required = false;
// 		duration_mon.required = false;
// 	}

// };
// tue.onclick = function (event) {
// 	if (tue.checked) {
// 		start_time_tue.style.display = "block";
// 		duration_tue.style.display = "block";
// 		start_time_tue.required = true;
// 		duration_tue.required = true;
// 	} else {
// 		start_time_tue.style.display = "none";
// 		duration_tue.style.display = "none";
// 		start_time_tue.required = false;
// 		duration_tue.required = false;
// 	}

// };

// wed.onclick = function (event) {
// 	if (wed.checked) {
// 		start_time_wed.style.display = "block";
// 		duration_wed.style.display = "block";
// 		start_time_wed.required = true;
// 		duration_wed.required = true;
// 	} else {
// 		start_time_wed.style.display = "none";
// 		duration_wed.style.display = "none";
// 		start_time_wed.required = false;
// 		duration_wed.required = false;
// 	}

// };


// thurs.onclick = function (event) {
// 	if (thurs.checked) {
// 		start_time_thurs.style.display = "block";
// 		duration_thurs.style.display = "block";
// 		duration_thurs.required = true;
// 		start_time_thurs.required = true;
// 	} else {
// 		start_time_thurs.style.display = "none";
// 		duration_thurs.style.display = "none";
// 		start_time_thurs.required = false;
// 		duration_thurs.required = false;
// 	}

// };

// fri.onclick = function (event) {
// 	if (fri.checked) {
// 		start_time_fri.style.display = "block";
// 		duration_fri.style.display = "block";
// 		start_time_fri.required = true;
// 		duration_fri.required = true;
// 	} else {
// 		start_time_fri.style.display = "none";
// 		duration_fri.style.display = "none";
// 		start_time_fri.required = false;
// 		duration_fri.required = false;
// 	}

// };

// sat.onclick = function (event) {
// 	if (sat.checked) {
// 		start_time_sat.style.display = "block";
// 		duration_sat.style.display = "block";
// 		start_time_sat.required = true;
// 		duration_sat.required = true;
// 	} else {
// 		start_time_sat.style.display = "none";
// 		duration_sat.style.display = "none";
// 		start_time_sat.required = false;
// 		duration_sat.required = false;
// 	}

// };

// sun.onclick = function (event) {
// 	if (sun.checked) {
// 		start_time_sun.style.display = "block";
// 		duration_sun.style.display = "block";
// 		start_time_sun.required = true;
// 		duration_sun.required = true;
// 	} else {
// 		start_time_sun.style.display = "none";
// 		duration_sun.style.display = "none";
// 		start_time_sun.required = false;
// 		duration_sun.required = false;
// 	}

// };

// //jquery to validate that atleast one checkbox is checked
// jQuery(function($) {
// 	var requiredCheckboxes = $(':checkbox[required]');
// 	requiredCheckboxes.on('change', function(e) {
// 	  var checkboxGroup = requiredCheckboxes.filter('[name="' + $(this).attr('name') + '"]');
// 	  var isChecked = checkboxGroup.is(':checked');
// 	  checkboxGroup.prop('required', !isChecked);
// 	});
// 	requiredCheckboxes.trigger('change');
//   });


