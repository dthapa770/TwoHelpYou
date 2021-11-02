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
    return document.getElementsByTagName("section").length;
}

/**
 * Function Updates an element on the result page that notifiys
 * the users the result of their search
 * @param message string of message to append
 */
function UpdateCardCount(message) {
    var post_number = document.getElementById("post_number");
    if (!post_number) {
        let main_content = document.getElementById('main_content');
        post_number = document.createElement("div");
        post_number.id = "post_number";
        post_number.classList.add("side_bar");
        main_content.appendChild(post_number);
    }
    post_number.innerText = GetCardCount() + message;
}

/**
 * Function grabs the values from the search bar sends the search to the
 * backend where it will return the requested data. Based on the data content
 * it will populate the main body of the result page.
 */
function ExecuteSearch(){
    let search_menu = document.getElementById('select_menu').value;
    let search_text = document.getElementById('search_text').value;
    let search_url = `/post/search?search=${search_menu},${search_text}`;
    fetch(search_url)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let new_main_content = '<div class="side_bar" id="post_number"> </div>';
            data_json.results.forEach((row) => {
                new_main_content += CreateCard(row);
            });
            let main_contentontent = document.getElementById('main_content');
            main_contentontent.innerHTML = new_main_content;
            if (data_json.message) {
                UpdateCardCount(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

/**
 * Updates the number of post/cards on the 
 * result/main page automatically
 */
let main_content = document.getElementById("main_content");
if (main_content) {
    UpdateCardCount(" most highest rated posts.");
}
/**
 * Event listener waiting for user to interact with the
 * search button
 */
let search_button = document.getElementById('search_button');
if (search_button) {
    search_button.onclick = function (event) {
        ExecuteSearch();
    }
}

/**
 * Template for the cards to be appeneded to the result page
 * based on the data sent to ir
 * @param post_data data from database used to populate posts
 * @returns the html to be appended to the page
 */
function CreateCard(post_data) {
    return `
    <section class="card_body" id="post-${post_data.post_id}>
        <p class="card_title">${post_data.course_prefix}${post_data.course_postfix}</p>
        <img class="card-image" src="./${post_data.photopath}" alt="image missing" width="100" height="100">
        <p class="card_title">${post_data.first_name}</p>
        <p class="card_title">${post_data.avg_rating}</p>
        <p class="card_text">${post_data.availability}</p>
    </section>`
}