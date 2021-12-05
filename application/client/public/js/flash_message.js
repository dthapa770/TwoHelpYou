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
 * File: flash_message.js
 * 
 * Description: Provides functionability to flash messages.
 *****************************************************************************/

/**
 * Removes Flash Message about a set time has passed.
 */
 function SetFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05){
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

/**
 * Event listener to look for flash message to remove.
 */
let flashElement = document.getElementById('flash_message');
if (flashElement){
    SetFlashMessageFadeOut();
}