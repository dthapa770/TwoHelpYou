var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Team 1' });
});

//router for the about us page 
router.get('/aboutUs', function(req, res, next) {
  res.render('aboutUs', { title: 'Team 1' });
}) ;

router.get('/about/Fong', function(req, res, next) {
  res.render('./about/Fong', { title: 'Team 1' });
}) ;

router.get('/about/Lam', function(req, res, next) {
  res.render('./about/Lam', { title: 'Team 1' });
}) ;

router.get('/about/Puri', function(req, res, next) {
  res.render('./about/Puri', { title: 'Team 1' });
}) ;

router.get('/about/Resayo', function(req, res, next) {
  res.render('./about/Resayo', { title: 'Team 1' });
}) ;

router.get('/about/Thapa', function(req, res, next) {
  res.render('./about/Thapa', { title: 'Team 1' });
}) ;

router.get('/about/Xu', function(req, res, next) {
  res.render('./about/Xu', { title: 'Team 1' });
}) ;
//end of router for about page

module.exports = router;
