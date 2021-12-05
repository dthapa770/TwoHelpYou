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

//get days checkboxes
let mon = document.getElementById('monday');
let tue = document.getElementById('tuesday');
let wed = document.getElementById('wednesday');
let thurs = document.getElementById('thursday');
let fri = document.getElementById('friday');
let sat = document.getElementById('saturday');
let sun = document.getElementById('sunday');

//get start times
let start_time_mon = document.getElementById('monday_time');
let start_time_tue = document.getElementById('tuesday_time');
let start_time_wed = document.getElementById('wednesday_time');
let start_time_thurs = document.getElementById('thursday_time');
let start_time_fri = document.getElementById('friday_time');
let start_time_sat = document.getElementById('saturday_time');
let start_time_sun = document.getElementById('sunday_time');

//get duration elements
let duration_mon = document.getElementById('duration_1');
let duration_tue = document.getElementById('duration_2');
let duration_wed = document.getElementById('duration_3');
let duration_thurs = document.getElementById('duration_4');
let duration_fri = document.getElementById('duration_5');
let duration_sat = document.getElementById('duration_6');
let duration_sun = document.getElementById('duration_7');


//event listener for days checkboxes
// for (let i = 0; i < days.length; i++) {
// 	days[i].checked = function (event) {
// 		if (days[i].checked) {
// 			start_times[i].style.display = "block";
// 		} else {
// 			start_times[i].style.display = "none";
// 		}
// 	};
// }
//if checkbox is checked display time input
mon.onclick = function (event) {
	console.log("checked");
	if (mon.checked) {
		start_time_mon.style.display = "block";
		duration_mon.style.display = "block";
	} else {
		start_time_mon.style.display = "none";
		duration_mon.style.display = "none";
	}

};
tue.onclick = function (event) {
	if (tue.checked) {
		start_time_tue.style.display = "block";
		duration_tue.style.display = "block";
	} else {
		start_time_tue.style.display = "none";
		duration_tue.style.display = "none";
	}

};

wed.onclick = function (event) {
	if (wed.checked) {
		start_time_wed.style.display = "block";
		duration_wed.style.display = "block";
	} else {
		start_time_wed.style.display = "none";
		duration_wed.style.display = "none";
	}

};


thurs.onclick = function (event) {
	if (thurs.checked) {
		start_time_thurs.style.display = "block";
		duration_thurs.style.display = "block";
	} else {
		start_time_thurs.style.display = "none";
		duration_thurs.style.display = "none";
	}

};

fri.onclick = function (event) {
	if (fri.checked) {
		start_time_fri.style.display = "block";
		duration_fri.style.display = "block";
	} else {
		start_time_fri.style.display = "none";
		duration_fri.style.display = "none";
	}

};

sat.onclick = function (event) {
	if (sat.checked) {
		start_time_sat.style.display = "block";
		duration_sat.style.display = "block";
	} else {
		start_time_sat.style.display = "none";
		duration_sat.style.display = "none";
	}

};

sun.onclick = function (event) {
	if (sun.checked) {
		start_time_sun.style.display = "inline-block";
		duration_sun.style.display = "inline-block";
	} else {
		start_time_sun.style.display = "none";
		duration_sun.style.display = "none";
	}

};



