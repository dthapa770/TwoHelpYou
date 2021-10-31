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

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = function (event) {
        executeSearch();
    }
}

function createCard(postData) {
    return `
    <div class="card-body">
        <img class="card-image" src="./${postData.photopath}" alt="image missing" width="100" height="100">
        <p class="card-title">${postData.first_name}</p>
        <p class="card-text">${postData.last_name}</p>
        <p class="card-text">${postData.date}</p>
        <p class="card-text">${postData.course}</p>
        <p class="card-text">${postData.time}</p>
        <p class="card-text">${postData.class}</p>  
    </div>`
}