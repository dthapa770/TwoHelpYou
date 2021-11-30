const settextarea = document.getElementById('message-text');

const writetext = () =>{
    console.log("loading the text");
    // localStorage.clear();
    // var x = localStorage.getItem('inputbox');
    // document.getElementById("text_area").innerHTML = x;
}

settextarea.addEventListener('load', writetext);