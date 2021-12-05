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
 * File: post_error.js
 * 
 * Description: provide messages to post related errors
 *****************************************************************************/

class PostError extends Error{
    constructor (message, redirectURL, status){
        super(message);
        this.redirectURL=redirectURL;
        this.status=status;
    }
    GetMessage(){
        return this.message;
    }
    GetRedirectURL(){
        return this.redirectURL;
    }
    GetStatus(){
        return this.status;
    }
}
module.exports=PostError;