class UserError extends Error{
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
module.exports=UserError;