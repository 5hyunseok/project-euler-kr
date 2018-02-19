var express = require('express');
var router = express.Router();

var defaultTitle = '프로젝트 오일러 - 한글';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: defaultTitle });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: defaultTitle, about_id: 'current' });
});

router.get('/archives', function(req, res, next) {
  res.redirect('/archives/page/1');
  // res.render('problem', { title: defaultTitle, archives_id: 'current' });
});

router.get('/archives/page/:number', function(req, res, next) {
  var pageNum = req.params.number;
  var totalNum = 610;
  var totalPageNum = Math.ceil(totalNum / 50);
  var isNum = /^\d+$/.test(pageNum);

  // check valid page number
  if (pageNum > totalPageNum || pageNum < 1 || !isNum) {
    res.status(500);
    res.render('error', { message: '유효하지 않은 페이지입니다.' });
  }

  var pages = [];
  for(var i = 1; i <= totalPageNum; i++){
    var page = { num: i };
    if (pageNum == i) {
      page.current = true;
    } else {
      page.current = false;
    }
    pages.push(page);
  }
  res.render('archives', {
    title: defaultTitle,
    archives_id: 'current',
    total_num: totalNum,
    total_page_num: totalPageNum,
    pages: pages
  });
});

module.exports = router;
