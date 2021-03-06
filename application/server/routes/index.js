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
 * File: index.js
 * 
 * Description: deals with most of the page routing.
 *****************************************************************************/

var express = require('express');
var router = express.Router();
var GetRecentPost = require('../middleware/post_middleware').GetRecentPost;
var GetAllPostCoursePrefix = require('../middleware/post_middleware').GetAllPostCoursePrefix;
var GetAllUserMessages = require('../middleware/message_middleware').GatAllUserMessages;
var GetPostById = require('../middleware/post_middleware').GetUserPostById;

/* GET home page. */
router.get('/', GetRecentPost, function(req, res, next) {
  res.render('index', { title: 'Software Engineering Class SFSU' });
});

// router for the about us page 
router.get('/about_us', function(req, res, next) {
  res.render('about_us', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/fong', function(req, res, next) {
  res.render('./about/fong', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/lam', function(req, res, next) {
  res.render('./about/lam', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/puri', function(req, res, next) {
  res.render('./about/puri', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/resayo', function(req, res, next) {
  res.render('./about/resayo', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/thapa', function(req, res, next) {
  res.render('./about/thapa', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/xu', function(req, res, next) {
  res.render('./about/xu', { title: 'Software Engineering Class SFSU' });
}) ;
//end of router for about page

router.get('/login', function(req,res,next){
  res.render('login'), {title: 'Software Engineering Class SFSU'}
});

router.get('/register', function(req,res,next){
  res.render('register'), {title: 'Software Engineering Class SFSU'}
});

router.get('/results', function(req,res,next){
  res.render('result'), {title: 'Software Engineering Class SFSU'}
});

router.get('/post_form', GetAllPostCoursePrefix, function(req,res,next){
  res.render('post_form'), {title: 'Software Engineering Class SFSU'}
})

router.get('/message_page', GetAllUserMessages, function(req,res,next) {
  res.render('message_page'), {title: 'Software Engineering Class SFSU'}
})

router.get('/post/:id(\\d+)',GetPostById,function(req,res,next){
     res.render('post'),{ title:'Software Engineering Class SFSU'} 
});

router.get('/tos', function(req,res,next) {
  res.render('tos'), {title: 'Software Engineering Class SFSU'}
});

router.get('/privacy_rules', function(req,res,next) {
  res.render('privacy_rules'), {title: 'Software Engineering Class SFSU'}
});

module.exports = router;
