const {SuccessPrint,ErrorPrint}=require("../helpers/debug/debug_printers");
const RouteProtectors={};

RouteProtectors.UserIsLoggedIn=function(req,res,next){
    if(req.session.username) {
        successPrint('User is logged in');
        next();
    }else{
            errorPrint('User is not logged in');
            req.flash('error','You must be logged in to create a Post!');
            res.redirect('/login');
    }

}
module.exports=RouteProtectors;