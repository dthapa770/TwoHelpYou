var express = require('express');
var router = express.Router();

var db = require ('../config/database');

router.get('/search',(req,res,next)=>{
    let searchTerm =  req.query.search;
    if (!searchTerm){
        db.query('SELECT user.first_name,user.last_name, tutor_posting.date, tutor_posting.course,tutor_posting.time,tutor_posting.class,user.photopath  FROM tutor_posting INNER JOIN user ON user.id= tutor_posting.user_id ORDER BY date DESC;',[])
            .then(([results,fields]) =>{
                res.send({
                message: "No results found for search but take a look at some recent posts",
                results: results
                });
            })
    } else{
        let sqlSearchTerm = "%"+searchTerm+"%";
        db.execute("SELECT  user.first_name,user.last_name, tutor_posting.date, tutor_posting.course,tutor_posting.time,tutor_posting.class,user.photopath,\
        concat_ws(' ',user.first_name,user.last_name, tutor_posting.date, tutor_posting.course,tutor_posting.time,tutor_posting.class)\
        AS haystack\
        FROM tutor_posting\
        INNER JOIN user\
        ON user.id= tutor_posting.user_id\
        HAVING haystack like ? ; ",[sqlSearchTerm])
        .then(([results,fields]) =>{
            if( results && results.length){
                res.send({
                    message: `${results.length} results found`,
                    results: results
                    });
                
            } else {
                db.query('SELECT user.first_name,user.last_name, tutor_posting.date, tutor_posting.course,tutor_posting.time,tutor_posting.class,user.photopath  FROM tutor_posting INNER JOIN user ON user.id= tutor_posting.user_id ORDER BY date DESC;',[])
                                .then(([results,fields]) =>{
                                    res.send({
                                        message: "No results found for search but take a look at some recent posts",
                                        results: results
                                        });
                                })
            }
        });
    }
});

module.exports= router;