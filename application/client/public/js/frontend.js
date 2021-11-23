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
 * File: frontend.js
 * 
 * Description: Provides functionability to the home page that is being used
 *              as the search result page as well.
 *****************************************************************************/

/**
 * Function to get the number of sections on the result page
 * the section div tag is exclusively used to wrap a post/card
 * @returns number of section div tags
 */
function GetCardCount() {
	return document.getElementsByTagName('section').length;
}

/**
 * Function Updates an element on the result page that notifiys
 * the users the result of their search
 * @param message string of message to append
 */
function UpdateCardCount(message) {
	var post_number = document.getElementById('post_number');
	if (!post_number) {
		let main_content = document.getElementById('main_content');
		post_number = document.createElement('div');
		post_number.id = 'post_number';
		post_number.classList.add('side_bar');
		main_content.appendChild(post_number);
	}
	post_number.innerText = GetCardCount() + message;
}

/**
 * Search execution now grabs the elemeents needed to the execute
 * the search and change the location by sending the request to
 * the post route.
 */
function ExecuteSearch() {
	let search_menu = document.getElementById('select_menu').value;
	let search_text = document.getElementById('search_text').value;
	let search_url = `/post/search?search=${search_menu},${search_text}`;
	window.location.assign(search_url);
}

//prevents and stops a XSS attack 
function JsEscape(str){
	return String(str).replace(/[^\w. ]/gi, function(c){
	   return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
	});
} 

/**
 * Updates the number of post/cards on the 
 * result/main page automatically
 */
let main_content = document.getElementById('main_content');
if (main_content) {
	UpdateCardCount(' most highest rated posts.');
}
/**
 * Event listener waiting for user to interact with the
 * search button
 */
let search_button = document.getElementById('search_button');
if (search_button) {
	search_button.onclick = function(event) {
		event.preventDefault();
		JsEscape(); 
		ExecuteSearch();
	};
}

/** To DO: add proper hover functionality to the cards */
let cards = document.getElementsByClassName('card_body');
if (cards) {
	for (let i = 0; i < cards.length; i++) {
		cards[i].onmouseover = function(event) {
			cards[i].style.backgroundColor = '#f5f5f5';
		};
		cards[i].onmouseout = function(event) {
			cards[i].style.backgroundColor = '';
		};
	}
}

/**
 * Event listener waiting for the user to interact
 * with the logout button.
 */
let logout_button = document.getElementById('logout');
if (logout_button) {
	logout_button.onclick = (even) => {
		fetch('/users/logout', {
			method: 'POST'
		}).then((data) => {
			location.replace('/');
		});
	};
};

/**
 * Prevents the use of the enter key from breaking things with the search.
 */
window.addEventListener('keydown', function(event) {
	if (event.key == 'Enter'){
		event.preventDefault();
		return false;
	}
})

/**
 * Event triggers paying attention to the search bar to ensure
 * persistency.
 */
window.onload = function() {
	RetreiveSearch();
	document.getElementById('select_menu').onload = StoreSearch();
	document.getElementById('search_text').onload = StoreSearch();
}
document.getElementById('select_menu').addEventListener("change", StoreSearch);
document.getElementById('search_text').addEventListener('change', StoreSearch);

/**
 * Stores the two fields for the search bar.
 */
function StoreSearch() {
	let prefix = document.getElementById('select_menu').value;
	let postfix = document.getElementById('search_text').value;
	
	const selected_course = {
		prefix: prefix,
		postfix: postfix,
	}
	window.localStorage.setItem('search', JSON.stringify(selected_course))
}

/**
 * Retreives the two fields for the search bar to prepopulate
 * on loading up the page.
 */
function RetreiveSearch() {
	let records = window.localStorage.getItem('search');
	let course_parts = JSON.parse(records);

	if (course_parts.prefix) {
		let prefix = document.getElementById(course_parts.prefix);
		prefix.setAttribute('selected', true);
	}
	if (course_parts.postfix) {
		let postfix = document.getElementById('search_text');
		postfix.setAttribute('value', course_parts.postfix);
	}
}