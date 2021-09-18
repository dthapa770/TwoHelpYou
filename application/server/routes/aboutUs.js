var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('aboutUs', { title: 'Team 1' });
});

router.get('/about/aboutFong', function(req, res, next) {
  res.render('aboutFong', { title: 'Team 1' });
}) ;

module.exports = router;