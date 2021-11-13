var db=require("../config/database");
const MessageModel= {};

MessageModel.Create = (sender,receiver,message) =>{
    let baseSQL = 'INSERT INTO message (time, message, receiver_id,sender_id) VALUES (now(),?,?,?);'
    return db.query(baseSQL,[sender,receiver,message])
    .then (([results,fields]) =>{
        if(results && results.affectedRows){
            return Promise.resolve(results.insertId)
        } else {
            return Promise.resolve(-1);
        }

    })
    .catch((err) => Promise.reject(err));
}

MessageModel.GetMessage = (user_id) =>{
    let baseSQL= `SELECT * FROM message WHERE receiver_id= ?;`
    return db.query(baseSQL, [user_id])
        .then (([results,fields]) =>{
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));

}

module.exports = MessageModel;