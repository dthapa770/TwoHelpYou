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
	UpdateCardCount(' most recently created posts');
}

/** Add proper hover functionality to the cards */
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
 * Format time for messages
 */
document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelectorAll('span[class=date_messaged]').forEach((message_date => {
		message_date.textContent = new Date(message_date.textContent).toLocaleString();
	}));
});