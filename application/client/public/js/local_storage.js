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
 * File: local_storage.js
 * 
 * Description: Store data from forms locally.
 *****************************************************************************/

const loginbutton = document.querySelector('.lsbutton');
const sendbutton = document.querySelector('.deletels');
const settextarea = document.querySelector('.text_area');
// const settextarea = document.getElementById('a');

// remove first 3 char
function Remove3char(username_tag) {
    return username_tag.substring(3);
}

// remove the first 5 char
function Remove5char(value) {
    return value.substring(7);
}

//get the user input and store it into local storage
const savetolocalstorge = () =>{
    //get user message box
    var inputVal = document.getElementById("message-text");

    // var username_tag = document.getElementById("username").innerHTML;
    // username_tag  = Remove3char(username_tag);

    // var time = document.getElementById("date-time").innerHTML;
    // // var time = document.write(new Date().toLocaleDateString());
    // // time = Remove5char(time);

    // var course = document.getElementById("course").innerHTML;
    // course = Remove5char(course);

    

    // localStorage.setItem('inputbox', inputVal.value);
    localStorage.setItem('inputbox', inputVal.value);
    // // localStorage.setItem('tutor', tutorname.value);
    // localStorage.setItem('tutor', username_tag);
    // localStorage.setItem('time', time);
    // localStorage.setItem('course', course);
};

//remove everything in localstorage
const deletelocalstorage = () =>{
    // localStorage.clear();
    localStorage.removeItem('inputbox');
}

//
const writetext = () => {
    let inputVal = window.localStorage.getItem('inputbox');

    document.getElementById("message-text").innerHTML = inputVal;
}

window.addEventListener('load', writetext);

if(loginbutton){
    loginbutton.addEventListener('click', savetolocalstorge);
}

if(sendbutton){
    sendbutton.addEventListener('click', deletelocalstorage);
}
