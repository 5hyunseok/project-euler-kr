var express = require('express');
var router = express.Router();
var db = require('../common/problem/db.js');

var defaultTitle = '프로젝트 오일러 - 한글';

var passport = require('passport');

var mysql_dbc = require('../common/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

// router.get('/mysql/test', function (req, res) {
//   var stmt = 'select *from ....';
//   connection.query(stmt, function (err, result) {
//     .....
//   })
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('about', { title: defaultTitle, user: req.user });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: defaultTitle,
    flash: req.flash('registerMessage')
  });
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/register',
  failureFlash : true
}));

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: defaultTitle,
    flash: req.flash('loginMessage')
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: defaultTitle,
    about_id: 'current',
    user: req.user
  });
});

router.get('/archives', function(req, res, next) {
  res.redirect('/archives/page/1');
});

router.get('/archives/page/:number', function(req, res, next) {
  var pageNum = req.params.number;
  var isNum = /^\d+$/.test(pageNum);

  // check valid page number
  if (pageNum < 1 || !isNum) {
    res.status(500);
    res.render('error', { message: '유효하지 않은 페이지입니다.' });
  }

  const numPerPage = 50;

  var minNum = (pageNum - 1) * numPerPage + 1;
  var maxNum = (pageNum) * numPerPage;
  db.serialize(function() {
    db.get('select max(number) as max from problems', function(err, result) {
      var totalNum = result.max;
      var totalPageNum = Math.ceil(totalNum / numPerPage);

      if (pageNum > totalPageNum) {
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
      var problems = [];
      db.each('select number, title, title_kr, answer_cnt from problems where number >= ' + minNum + ' and number <= ' + maxNum + ' order by number', function (err, row) {
        problems.push(row);
      }, function (err, num) {
        res.render('archives', {
          title: defaultTitle,
          archives_id: 'current',
          total_num: totalNum,
          total_page_num: totalPageNum,
          pages: pages,
          problems: problems,
          user: req.user
        });
      });
    })
  })
});

router.get('/problem/:number', function(req, res, next) {
  var num = req.params.number;
  db.serialize(function() {
    db.get('select * from problems where number=' + num, function(err, row) {
      if (row === undefined) res.render('error', { message: '유효하지 않은 문제입니다.'});
      connection.query("SELECT * FROM answer WHERE number = ?", [num], function(err, ans){
        if (err) console.log(err);
        var existAnswer = false;
        if (ans[0].answer != null) existAnswer = true;
        console.log(existAnswer);
        res.render('problem', {
          title: defaultTitle,
          problem: row,
          answer: existAnswer,
          user: req.user
        });
      });
    });
  });
});

module.exports = router;
