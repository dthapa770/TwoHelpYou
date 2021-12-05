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
 * File: route_protectors.js
 * 
 * Description: middleware between model and routes
 *****************************************************************************/

const {SuccessPrint,ErrorPrint} = require("../helpers/debug/debug_printers");
const RouteProtectors={};

/**
 * Protects certain routes requiring users to be logged in
 * @param req 
 * @param res 
 * @param next 
 */
RouteProtectors.UserIsLoggedIn=function(req,res,next){
    if(req.session.username) {
        SuccessPrint('User is logged in');
        next();
    }else{
        ErrorPrint('User is not logged in');
        req.flash('error','You must be logged in!');
        res.redirect('/login');
    }
}
module.exports=RouteProtectors;