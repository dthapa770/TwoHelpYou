var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('aboutUs', { title: 'Hello' });
});

router.get('/about/aboutFong', function(req, res, next) {
  res.render('aboutFong', { title: 'Software Engineering Class SFSU' });
}) ;

module.exports = router;