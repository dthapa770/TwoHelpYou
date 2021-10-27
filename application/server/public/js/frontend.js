

function executeSearch(){
    let searchTerm = document.getElementById('search-text').value;
    if (searchTerm || searchTerm=="") {
        let mainContent = document.getElementById('main-content');
        let searchURL = `/post/search?search=${searchTerm}`;
        fetch(searchURL)
        .then((data) =>{
            return data.json();            
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
           mainContent.innerHTML=newMainContentHTML;
           console.log(data_json.message);
        })
        .catch((err) => console.log(err));    
       
    } 
}

let searchButton= document.getElementById('search-button');
if(searchButton){
    searchButton.onclick =executeSearch;
}

function createCard(postData){  
    return `
    <img class="card-image" src=${postData.photopath} alt="image missing">
    <div class="card-body">
        <p class="card-title">${postData.first_name}</p>
        <p class="card-text">${postData.last_name}</p>
        <p class="card-text">${postData.date}</p>
        <p class="card-text">${postData.course}</p>
        <p class="card-text">${postData.time}</p>
        <p class="card-text">${postData.class}</p>  
    </div>
</div>`;
}
