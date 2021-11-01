var express = require('express');
var router = express.Router();
var getHighestRatedPost = require('../middleware/postmiddleware').getHighestRatedPost;
var getAllPostCoursePrefix = require('../middleware/postmiddleware').getAllPostCoursePrefix;
// const PostModel = require('../model/Post');

/* GET home page. */
router.get('/', getHighestRatedPost, getAllPostCoursePrefix, function(req, res, next) {
  res.render('index', { title: 'Software Engineering Class SFSU' });
});

//router for the about us page 
router.get('/aboutUs', function(req, res, next) {
  res.render('aboutUs', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Fong', function(req, res, next) {
  res.render('./about/Fong', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Lam', function(req, res, next) {
  res.render('./about/Lam', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Puri', function(req, res, next) {
  res.render('./about/Puri', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Resayo', function(req, res, next) {
  res.render('./about/Resayo', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Thapa', function(req, res, next) {
  res.render('./about/Thapa', { title: 'Software Engineering Class SFSU' });
}) ;

router.get('/about/Xu', function(req, res, next) {
  res.render('./about/Xu', { title: 'Software Engineering Class SFSU' });
}) ;
//end of router for about page

router.get('/Login', function(req,res,next){
  res.render('login'), {title: 'Software Engineering Class SFSU'}
});

router.get('/Register', function(req,res,next){
  res.render('register'), {title: 'Software Engineering Class SFSU'}
});

router.get('/Results', function(req,res,next){
  res.render('result'), {title: 'Software Engineering Class SFSU'}
});

module.exports = router;
