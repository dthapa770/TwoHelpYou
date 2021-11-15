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
 * Description: Provides functionability to the message form page.
 *****************************************************************************/

/**
 * This function is to to make the input box auto resize when needed
 */
let el = document.getElementById(`message-text`);
el.addEventListener("input", function() {
  if (el.scrollTop != 0)
    el.style.height = el.scrollHeight + "px";
});
