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

const message_login_button = document.querySelector('.login_send_button');
const message_send_button = document.querySelector('.delete_login_send');

const post_login_button = document.querySelector('.post_login_send_button');
const post_send_button = document.querySelector('.post_delete_login_send');

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
const SaveMessageLocalStorge = () =>{
    //get user message box
    var input_value = document.getElementById("message_text");

    localStorage.setItem('input_box', input_value.value);
};

/**
 * remove key in localstorage that is for message page
 */
const DeleteMessageLocalStorage = () =>{
    // localStorage.clear();
    localStorage.removeItem('input_box');
}

/**
 * store user input back to textbox in message page
 */
const WriteText = () => {
    let input_value = window.localStorage.getItem('input_box');

    document.getElementById("message_text").innerHTML = input_value;
}

/**
 * get and store all the input field data into local storage
 */
const GetPostInfo = () => {
    let major = document.getElementById('post_select_menu');
    let course_number =  document.getElementById('course_postfix');
    let availability = document.getElementById('availability2');
    // let credibility = document.getElementById('credibility2');
    

    localStorage.setItem('major', major.value);
    localStorage.setItem('course', course_number.value);
    localStorage.setItem('availability', availability.value);
    // localStorage.setItem('credibility', credibility.value);
}

/**
 * write all the local starage data back into the post page
 */
const WritePostInfo = () => {
    let major = window.localStorage.getItem('major');
    let course_number = window.localStorage.getItem('course');
    let availability = window.localStorage.getItem('availability');
    // let credibility = window.localStorage.getItem('credibility');

    document.getElementById("post_select_menu").value = major;
    document.getElementById('course_postfix').value = course_number;
    document.getElementById('availability2').value = availability;
    // document.getElementById('credibility2').value = credibility;
}

/**
 * remove all key that relate to post page in localstorage
 */
const DeletePostLocalStorage = () =>{
    // localStorage.clear();
    localStorage.removeItem('major');
    localStorage.removeItem('course');
    localStorage.removeItem('availability');
    // localStorage.removeItem('credibility');
}

/**
 * listen to the message page submit button if user isn't login
 */
if(message_login_button){
    message_login_button.addEventListener('click', SaveMessageLocalStorge);
}

/**
 * listen to the message page submit button if user already login
 */
if(message_send_button){
    window.addEventListener('load', WriteText);
    message_send_button.addEventListener('click', DeleteMessageLocalStorage);
}

/**
 * listen to the post page submit button if user isn't login
 */

if(post_login_button){
    post_login_button.addEventListener('click', GetPostInfo);
}

/**
 *listen to the post page submit button when user is already login
 */
if(post_send_button){
    window.addEventListener('load', WritePostInfo);
    post_send_button.addEventListener('click', DeletePostLocalStorage);
}



