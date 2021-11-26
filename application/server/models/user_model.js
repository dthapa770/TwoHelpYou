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
 * File: user_model.js
 * 
 * Description: builds query to be sent to database and returns
 * 				the results of the queries.
 *****************************************************************************/

var db= require("../config/database");
var bcrypt=require('bcrypt');
var UserModel = {};

/**
 * Creates insert query for users based on the completed form
 * @param first_name 
 * @param last_name 
 * @param username 
 * @param password 
 * @param email 
 * @returns resolution to inserton of user to database
 */
UserModel.Create = async (first_name,last_name,username,password,email,image_name) =>{
    var photopath = "images/uploads/" + image_name;
    var thumbnail = "images/thumbnails/" + image_name;
    return bcrypt.hash(password,10)
        .then((hashedPassword)=>{
            let baseSQL="INSERT INTO user (first_name,last_name,username,email,password,created,photopath,thumbnail) VALUES(?,?,?,?,?,now(),?,?);"
            return db.execute(baseSQL,[first_name,last_name,username,email,hashedPassword,photopath,thumbnail])
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

/**
 * Checks database to ensure username has not been used
 * @param username 
 * @returns resolution to query
 */
UserModel.UsernameExists = async (username) =>{
    return db.execute("SELECT * FROM user WHERE username=?", [username])
    .then(([results,fields]) =>{
        return Promise.resolve(!(results && results.length==0));
    })
        .catch((err) => Promise.reject(err));
}

/**
 * Checks database to ensure email has not ben used
 * @param email 
 * @returns resolution to query
 */
UserModel.EmailExists = async (email) =>{
    return db.execute("SELECT * FROM user WHERE email=?", [email])
    .then(([results, fields]) => {
          return Promise.resolve(!(results && results.length == 0));
    })
        .catch((err) => Promise.reject(err));
}

/**
 * Authenticate the user for sign in
 * @param email 
 * @param username 
 * @param password 
 * @returns result of signin
 */
UserModel.Authenticate = async (username, password) =>{
    let user_id;
    let baseSQL="SELECT user_id,username, password, email FROM user WHERE username=?;";
    return db.execute(baseSQL,[username])
        .then(([results,fields]) =>{
            if(results && results.length ==1){
                user_id= results[0].user_id;
                return bcrypt.compare(password, results[0].password );
            }else{
                return Promise.reject(-1);
            }
        })
        .then((password_match) =>{
            if(password_match){
                return Promise.resolve(user_id);
            }else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) =>Promise.reject(err));
};

/**
 * Get user information.
 * @param username 
 * @returns 
 */
UserModel.GetUser = async (username) => {
    let baseSQL = `SELECT u.username, u.user_id, u.first_name, u.photopath
                    from user u
                    where u.username = ?;`;
    return db.execute(baseSQL, [username])
    .then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
}

/**
 * Acquires the number of messages sent to the user
 * @param user_id 
 * @returns 
 */
UserModel.GetUserMessageCount = async (user_id) => {
    let baseSQL = `SELECT u.user_id, u.first_name, COUNT(m.receiver_id) AS messages 
                    FROM user u LEFT JOIN message m
                    ON u.user_id = m.receiver_id
                    GROUP BY u.user_id, m.receiver_id
                    HAVING u.user_id = ?;`
    return db.execute(baseSQL, [user_id])
    .then(([messages, fields]) => {
        return Promise.resolve(messages[0]);
    })
    .catch((err) => Promise.reject(err));
}

/**
 * Aquires the number of post made by the user
 * @param user_id 
 * @returns 
 */
UserModel.GetUserPostCount = async (user_id) => {
    let baseSQL = `SELECT u.user_id, COUNT(p.user_id) AS posts 
                    FROM user u LEFT JOIN post p
                    ON u.user_id = p.user_id
                    GROUP BY u.user_id, p.user_id
                    HAVING u.user_id = ?;`
    return db.execute(baseSQL, [user_id])
    .then(([posts, fields]) => {
        return Promise.resolve(posts[0]);
    })
    .catch((err) => Promise.reject(err));
}

module.exports = UserModel;