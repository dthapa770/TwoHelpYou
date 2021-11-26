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
 * File: modal.js
 * 
 * Description: Modal implementation provided by w3school.
 *****************************************************************************/


// Get the <span> element that closes the modal
var span_login = document.getElementsByClassName("close_login")[0];
var span_register = document.getElementsByClassName("close_register")[0];

// Get the login modal
var login_modal = document.getElementById("login_modal");

// Get the button that opens the login modal
var login_button = document.getElementById("login_button");

// Get the register modal
var register_modal = document.getElementById("register_modal");

// Get the button that opens the register modal
var register_button = document.getElementById("register_button");

// When the user clicks on the button, open the login modal
login_button.onclick = function() {
  login_modal.style.display = "block";
}

// When the user clicks on the button, open the register modal
register_button.onclick = function() {
  register_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span_login.onclick = function() {
  login_modal.style.display = "none";
}

span_register.onclick = function() {
  register_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == login_modal) {
    login_modal.style.display = "none";
  }
  if (event.target == register_modal) {
    register_modal.style.display = "none";
  }
}