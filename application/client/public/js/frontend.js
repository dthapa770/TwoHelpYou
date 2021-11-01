function getCardC() {
    return document.getElementsByTagName("section").length;
}

function updateCardCount(message) {
    var pNum = document.getElementById("postNum");
    if (!pNum) {
        let mainC = document.getElementById('main-content');
        pNum = document.createElement("div");
        pNum.id = "postNum";
        pNum.classList.add("side-bar");
        mainC.appendChild(pNum);
    }
    pNum.innerText = getCardC() + message;
}

function executeSearch(){
    let searchTerm = document.getElementById('search-text').value;
    if (!searchTerm) {
        location.replace('/');
        return;
    }
    let searchURL = `/post/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '<div class="side-bar" id="postNum"> </div>';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            let mainContent = document.getElementById('main-content');
            mainContent.innerHTML = newMainContentHTML;
            if (data_json.message) {
                updateCardCount(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

let mainContainer = document.getElementById("main-content");
if (mainContainer) {
    updateCardCount(" most highest rated posts.");
}

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = function (event) {
        executeSearch();
    }
}

function createCard(postData) {
    return `
    <section class="card-body" id="post-${postData.post_id}>
        <p class="card-title">${postData.course_prefix}${postData.course_postfix}</p>
        <img class="card-image" src="./${postData.photopath}" alt="image missing" width="100" height="100">
        <p class="card-title">${postData.first_name}</p>
        <p class="card-title">${postData.avg_rating}</p>
        <p class="card-text">${postData.availability}</p>
    </section>`
}