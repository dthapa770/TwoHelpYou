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
 * File: submit_modal.js
 * 
 * Description: Provides functionability to the submit button page.
 *****************************************************************************/

// Get the <span> element that closes the modal
var span_submit = document.getElementsByClassName("close_submit")[0];

// Get the modal
var submit_modal = document.getElementById("submit_modal");
var login_modal = document.getElementById("login_modal");
var register_modal = document.getElementById("register_modal");

// Get the button that opens the modal
var submit_button = document.getElementById("submit_button");
var submit_login_button = document.getElementById("submit_login_button");
var submit_register_button = document.getElementById("submit_register_button");

// When the user clicks on the button, open the submit modal
submit_button.onclick = function() {
  submit_modal.style.display = "block";
}

// When the user clicks on the button, open the login modal
submit_login_button.onclick = function() {
  submit_modal.style.display = "none";
  login_modal.style.display = "block";
}

// When the user clicks on the button, open the register modal
submit_register_button.onclick = function() {
  submit_modal.style.display = "none";
  register_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span_submit.onclick = function() {
  submit_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == submit_modal) {
    submit_modal.style.display = "none";
  }
}