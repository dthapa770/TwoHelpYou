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
 * File: post_middleware.js
 * 
 * Description: middleware between model and routes
 *****************************************************************************/

var PostModel = require('../models/post_model');
const PostMiddleware = {}

/**
 * Function to request and generate the highest rated post
 * for the route when the page is open
 * @param req 
 * @param res 
 * @param next 
 */
PostMiddleware.GetRecentPost = async function(req,res,next) {
    try {
        let cards = await PostModel.GetNRecentPosts(6);
        res.locals.cards = cards;
        if (cards.length == 0) {
            console.log("error in getting highest rated");
        }
        next();
    } catch(err) {
        next(err);
    }
}

/**
 * Function to request and populate the drop bar
 * with all the needed course prefixs
 * @param req 
 * @param res 
 * @param next 
 */
PostMiddleware.GetAllPostCoursePrefix = async function(req,res,next) {
    try  {
        let course = await PostModel.GetCoursePrefix();
        res.locals.course = course;
        if (course.length == 0) {
            console.log("error getting course Prefix");
        }
        next();
    } catch(err) {
        next(err);
    }
}

/**
 * Get all post related to the user.
 * @param req 
 * @param res 
 * @param next 
 */
PostMiddleware.GetAllUserPost = async function(req,res,next) {
    try {
        let courses = await PostModel.Search(req.params.username);
        res.locals.courses = courses;
        if (courses.length == 0) {
            console.log("Error getting courses");
        }
        next();
    } catch(err) {
        next(err);
    }
}

/**
 * Get all post related to the user using id
 * @param req 
 * @param res 
 * @param next 
 */
PostMiddleware.GetUserPostById = async function(req, res, next){
    try{
        let post_id = req.params.id;
        let results = await PostModel.GetPostById(post_id);
        if(results && results.length){
            res.locals.current_post = results[0];
            next();
        } 
    } catch(err) {
        next(err);
    }
}
module.exports = PostMiddleware;