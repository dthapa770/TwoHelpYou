var db= require("../config/database");
var bcrypt=require('bcrypt');
var UserModel = {};


UserModel.create=(first_name,last_name,username,password,email) =>{
    console.log(password);
    return bcrypt.hash(password,10)
        .then((hashedPassword)=>{
            let baseSQL="INSERT INTO user (first_name,last_name,username,email,password,created) VALUES(?,?,?,?,?,now());"
            return db.execute(baseSQL,[first_name,last_name,username,email,hashedPassword])
        })
        .then(([results,fields]) => {
            if(results && results.affectedRows){
                return Promise.resolve(results.insertId);
            }else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
}

UserModel.usernameExists=(username) =>{
    return db.execute("SELECT * FROM user WHERE username=?", [username])
    .then(([results,fields]) =>{
        return Promise.resolve(!(results && results.length==0));
    })
        .catch((err) => Promise.reject(err));
}

UserModel.emailExists= (email) =>{
    return db.execute("SELECT * FROM user WHERE email=?", [email])
    .then(([results, fields]) => {
          return Promise.resolve(!(results && results.length == 0));
    })
        .catch((err) => Promise.reject(err));
}

UserModel.authenticate = (email, username, password) =>{
    let user_id;
    let user_email;
    let baseSQL="SELECT user_id,username, password, email FROM user WHERE username=?;";
    return db.execute(baseSQL,[username])
        .then(([results,fields]) =>{
            if(results && results.length ==1){
                user_id= results[0].user_id;
                user_email = results[0].email;

                return bcrypt.compare(password, results[0].password && user_email,results[0].email);
            }else{
                return Promise.reject(-1);
            }
        })
        .then((passwordMatch) =>{
            if(passwordMatch){
                return Promise.resolve(userId);
            }else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) =>Promise.reject(err));
};
module.exports = UserModel;