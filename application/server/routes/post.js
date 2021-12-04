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
 * File: post.js
 * 
 * Description: Currently deals with anything post related
 *****************************************************************************/

//const {request} = require('express');
var express = require('express');
var router = express.Router();
const PostModel = require('../models/post_model');
const { SuccessPrint, ErrorPrint } = require('../helpers/debug/debug_printers');
const PostError = require('../helpers/error/post_error');

/**
 * Builds the string that is needed to forward to post middlware
 * based on the intial response and queries content will
 * results in different responses that generally returns
 * the information needed to build the tutoring post/cards
 */
router.get('/search', async (req, res, next) => {
    let searchQuery = (req.query.search).split(',');
    let searchTerm = '';
    let prefix = searchQuery[0];
    if (searchQuery[1].length > 40) {
        let results = await PostModel.GetNRecentPosts(5);
        res.render('search_results',{
            title: "Search: Query is too long",
            prefix: prefix,
            postfix: searchQuery[1],
            message: "search query is too long, try again.",
            cards: results
        });
        return;
    }
    if (prefix != '')
        searchTerm = searchQuery[0] +' '+ searchQuery[1];
    else
        searchTerm = searchQuery[1];
    if (!searchTerm) {
        let results = await PostModel.GetNRecentPosts(100);
        res.render('search_results',{
            title: "All Posts",
            prefix: prefix,
            postfix: searchQuery[1],
            message: "no search term given, showing all posts.",
            cards: results
        });
    } else {
        let results = await PostModel.Search(searchTerm);
        if (results.length) {
            res.render('search_results',{
                title: "Search: " + prefix +" "+ searchQuery[1],
                prefix: prefix,
                postfix: searchQuery[1],
                message: "that are relevent.",
                cards: results
            });
        } else if (prefix == ''){
            let results = await PostModel.GetNRecentPosts(5);
            res.render('search_results',{
                title: "Search: " + prefix +" "+ searchQuery[1],
                prefix: prefix,
                postfix: searchQuery[1],
                message: "no results were found.",
                cards: results
            });
        } else {
            let results = await PostModel.GetNRecentPrefixPosts(5, prefix);
            if (results.length < 1) {
                let results = await PostModel.GetNRecentPosts(5);
                res.render('search_results',{
                    title: "Search: " + prefix +" "+ searchQuery[1],
                    prefix: prefix,
                    postfix: searchQuery[1],
                    message: "no results in category, showing all recent posts.",
                    cards: results
                });
                return;
            }
            res.render('search_results',{
                title: "Search: " + prefix +" "+ searchQuery[1],
                prefix: prefix,
                postfix: searchQuery[1],
                message: "within catagory, no results were found.",
                cards: results
            });
        }
    }
})

/**
 * Creates a post and uploads credentials
 */
router.post('/request', async (req,res,next) => {
    let course_prefix = req.body.course_prefix;
    let course_postfix = req.body.course_postfix;
    let availability = req.body.availability;
    let course_id;
    let username = req.session.username;
    let credibility = req.files.credibility;

    try {
        // Checks if user is logged in to create post
        if (res.locals.logged) {
            SuccessPrint("User is logged in.")
        }
        else
            throw new PostError('Not logged in', "/post_form", 200);

        if (username) {
            SuccessPrint("User Name is grabbed");
        }
        else
            throw new PostError('Could not grab user name', "/post_form", 200);

        // Validation before sql query is executed
        if (course_prefix < 1 || course_prefix > 5)
            throw new PostError('Bad course Prefix');

        // Checks if course prefix is allowed
        let is_course_prefix = await PostModel.CheckCoursePrefix(course_prefix);
        if (is_course_prefix) {
            SuccessPrint("Course prefix is allowed.")
        }
        else
            throw new PostError('Not Allowed Course prefix', "/post_form", 200);
        
        // Validation before sql query is executed
        if (course_postfix.length > 3 || isNaN(course_postfix))
            throw new PostError('Course postfix is not allowed.', "/post_form", 200);

        // Checks if course postfix exists, if not add it to the table
        let is_course_postfix = await PostModel.CheckCoursePostfix(course_prefix, course_postfix);
        if (is_course_postfix) {
           SuccessPrint("Course postfix exist.");
           course_id = await PostModel.GetCourseID(course_prefix,course_postfix);
           if (course_id > 0) {
               SuccessPrint("Course ID grabbed.");
           }
           else {
               throw new PostError('Could not acquire Course ID.', "/post_form", 200);
           }
        }
        else
        {
            console.log('Course does not exist, adding course...');
            course_id = await PostModel.InsertCourse(course_prefix, course_postfix);
            if (course_id > 0) {
                SuccessPrint("Course ID grabbed.");
            }
            else {
                throw new PostError('Could not acquire Course ID.', "/post_form", 200);
            }
        }

        if (availability.length > 3) {
            SuccessPrint("Availability is long enough.");
        }
        else
            throw new PostError('Did not give enough of description.', "/post_form", 200);
        

        // uploads qualifications for the course the user wants
        // to tutor for into documents client/public/documents.
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new PostError('No Qualifications given.', "/post_form", 200);
        } 
        else{
            try {
                file_name = username + "_" + Date.now() + credibility.name;
                req.files.credibility.mv("../client/public/documents/" + file_name, (err) => {
                    if (err) {
                        throw new PostError('Could not copy file given.', "/post_form", 200);
                    }
                    else
                        SuccessPrint('File was moved');
                });
	        } catch (err) {
		        ErrorPrint('Error cannot handle file');
		        throw new PostError('Issue handeling file.', "/post_form", 200);
	        }
        }

        // Final validation before then create the post
        await PostModel.ValidateUser(username)
            .then((user_id) => {
                if (user_id < 0) {
                    throw new PostError("Invalid User trying to post.","/post_form", 200);
                } else {
                    SuccessPrint(username + ' is a valid user.');
                    return PostModel.CreatePost(availability,user_id,course_id,file_name);
                }
            })
            .then((created_post_id) => {
                if (created_post_id < 0) {
                    throw new PostError("Unable to make a post.","/post_form", 500);
                } else {
                    SuccessPrint("posts.js --> post was crated.");
                    req.flash('Success', `Tutor Request was Created.`);
                    req.session.save(function () {
                        res.redirect('/');
                    })
                }
            })
            .catch((err) => {
                ErrorPrint("Post could not be made");
                if (err instanceof PostError) {
                    ErrorPrint(err.GetMessage());
                    res.status(err.GetStatus());
                    req.flash('Error', err.GetMessage());
                    req.session.save(function () {
                      res.redirect(err.GetRedirectURL());
                    })
                } else {
                    next(err);
                }
            })
    }  catch (err) {
        console.log('error');
        ErrorPrint("Bad form data");
        if (err instanceof PostError) {
            ErrorPrint(err.GetMessage());
            res.status(err.GetStatus());
			req.flash('Error', err.GetMessage());
            req.session.save(function () {
              res.redirect(err.GetRedirectURL());
            })
        } else {
            next(err);
        }
        // the retun prevents the db.execution if there is an error
        return;
    }
})

module.exports= router;