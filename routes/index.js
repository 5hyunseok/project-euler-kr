var express = require('express');
var router = express.Router();

var defaultTitle = '프로젝트 오일러 - 한글';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: defaultTitle });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: defaultTitle });
})

module.exports = router;
