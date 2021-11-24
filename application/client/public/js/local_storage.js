const loginbutton = document.querySelector('.lsbutton');


const savetolocalstorge = () =>{
    var inputVal = document.getElementById("message-text");
    
    
    localStorage.setItem('inputbox', inputVal.value);
};

loginbutton.addEventListener('click', savetolocalstorge);