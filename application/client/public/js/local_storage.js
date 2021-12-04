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

const message_loginbutton = document.querySelector('.lsbutton');
const message_sendbutton = document.querySelector('.deletels');

const post_loginbutton = document.querySelector('.plsbutton');
const post_sendbutton = document.querySelector('.pdeletels');

/**
 * remove first 3 char in string
 */
function Remove3char(username_tag) {
    return username_tag.substring(3);
}

/**
 * remove the first 5 char in string
 */
function Remove5char(value) {
    return value.substring(7);
}

/**
 * get the user input in message and store it into local storage
 */
const save_message_localstorge = () =>{
    //get user message box
    var inputVal = document.getElementById("message-text");

    localStorage.setItem('inputbox', inputVal.value);
};

/**
 * remove key in localstorage that is for message page
 */
const delete_message_localstorage = () =>{
    // localStorage.clear();
    localStorage.removeItem('inputbox');
}

/**
 * store user input back to textbox in message page
 */
const writetext = () => {
    let inputVal = window.localStorage.getItem('inputbox');

    document.getElementById("message-text").innerHTML = inputVal;
}

/**
 * get and store all the input field data into local storage
 */
const getpostinfo = () => {
    let major = document.getElementById('post_select_menu');
    let coursenum =  document.getElementById('course_postfix');
    let availability = document.getElementById('availability2');
    // let credibility = document.getElementById('credibility2');
    

    localStorage.setItem('major', major.value);
    localStorage.setItem('course', coursenum.value);
    localStorage.setItem('availability', availability.value);
    // localStorage.setItem('credibility', credibility.value);
}

/**
 * write all the local starage data back into the post page
 */
const writepostinfo = () => {
    let major = window.localStorage.getItem('major');
    let coursenum = window.localStorage.getItem('course');
    let availability = window.localStorage.getItem('availability');
    // let credibility = window.localStorage.getItem('credibility');

    document.getElementById("post_select_menu").value = major;
    document.getElementById('course_postfix').value = coursenum;
    document.getElementById('availability2').value = availability;
    // document.getElementById('credibility2').value = credibility;
}

/**
 * remove all key that relate to post page in localstorage
 */
const delete_post_localstorage = () =>{
    // localStorage.clear();
    localStorage.removeItem('major');
    localStorage.removeItem('course');
    localStorage.removeItem('availability');
    // localStorage.removeItem('credibility');
}

/**
 * listen to the message page submit button if user isn't login
 */
if(message_loginbutton){
    message_loginbutton.addEventListener('click', save_message_localstorge);
}

/**
 * listen to the message page submit button if user already login
 */
if(message_sendbutton){
    window.addEventListener('load', writetext);
    message_sendbutton.addEventListener('click', delete_message_localstorage);
}

/**
 * listen to the post page submit button if user isn't login
 */

if(post_loginbutton){
    post_loginbutton.addEventListener('click', getpostinfo);
}

/**
 *listen to the post page submit button when user is already login
 */
if(post_sendbutton){
    window.addEventListener('load', writepostinfo);
    post_sendbutton.addEventListener('click', delete_post_localstorage);
}



