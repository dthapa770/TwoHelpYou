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

(function () {
'use strict'
var forms = document.querySelectorAll('.requires-validation')
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
  
      form.classList.add('was-validated')
    }, false)
  })
})()