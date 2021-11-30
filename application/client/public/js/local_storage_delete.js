const sendbutton = document.querySelector('.deletels');

const deletelocalstorage = () =>{
    localStorage.clear();
}

sendbutton.addEventListener('click', deletelocalstorage);