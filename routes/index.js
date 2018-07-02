var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../common/problem/db.js');

var defaultTitle = '프로젝트 오일러 - 한글';
var secretKey = "6LdFrFYUAAAAAKIIqPtphfgx4GeLCIHzmIMxxpdo";

String.prototype.isNumber = function() {
  return /^\d+$/.test(this);
}

var formatDate = function(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = '' + d.getFullYear(),
    hour = '' + d.getHours(),
    min = '' + d.getMinutes(),
    sec = '' + d.getSeconds();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (min.length < 2) min = '0' + min;
  if (sec.length < 2) sec = '0' + sec;

  return [year, month, day].join('-') + ' ' + [hour, min, sec].join(':');
}

var passport = require('passport');

var mysql_dbc = require('../common/db_con')();
var connection = mysql_dbc.init();
// mysql_dbc.test_open(connection);

router.get('/', function(req, res, next) {
  res.render('about', {
    title: defaultTitle,
    user: req.user
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: defaultTitle,
    flash: req.flash('registerMessage')
  });
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: defaultTitle,
    flash: req.flash('loginMessage')
  });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/get-solved-problems',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/get-solved-problems', function(req, res, next) {
  connection.query("SELECT no FROM submit WHERE usr_id = ? and solve_flag", [req.user.usr_id], function(err, sols) {
    if (err) console.log(err);
    var solArr = [];
    sols.forEach((sol) => {
      solArr.push(sol.no);
    })
    req.session.solved = solArr;
    req.session.save((err) => {
      var backURL = req.header('Referer') || '/';
      if (backURL.indexOf('login') > -1) res.redirect('/')
      else res.redirect(backURL);
    })
  });
})

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
  console.log('test');
  console.log(req.session.solved);
  console.log('test');
  var pageNum = req.params.number;
  var isNum = /^\d+$/.test(pageNum);

  // check valid page number
  if (pageNum < 1 || !isNum) {
    res.status(500);
    res.render('error', {
      message: '유효하지 않은 페이지입니다.'
    });
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
        res.render('error', {
          message: '유효하지 않은 페이지입니다.'
        });
      }

      var pages = [];
      for (var i = 1; i <= totalPageNum; i++) {
        var page = {
          num: i
        };
        if (pageNum == i) {
          page.current = true;
        } else {
          page.current = false;
        }
        pages.push(page);
      }
      var problems = [];
      var solved = [];
      if (req.user) solved = req.session.solved;
      db.each('select number, title, title_kr, answer_cnt from problems where number >= ' + minNum + ' and number <= ' + maxNum + ' order by number', function(err, row) {
        if (solved.indexOf(row.NUMBER) > -1) {
          row.solved = true;
        } else {
          row.solved = false;
        }
        problems.push(row);
      }, function(err, num) {
        res.render('archives', {
          title: defaultTitle,
          archives_id: 'current',
          total_num: totalNum,
          total_page_num: totalPageNum,
          pages: pages,
          problems: problems,
          user: req.user
          // solved: req.session.solved
        });
      });
    })
  })
});

router.get('/recent', function(req, res, next) {
  var recent = [];
  db.each('select * from problems order by number desc limit 10', function(err, row) {
    recent.push(row);
  }, function(err) {
    res.render('archives', {
      title: defaultTitle,
      recent: true,
      problems: recent,
      user: req.user
    });
  });
})

router.get('/problem/:number', function(req, res, next) {
  var num = req.params.number;
  var solved = [];
  if (req.user) solved = req.session.solved;

  db.serialize(function() {
    db.get('select * from problems where number=' + num, function(err, row) {
      if (row === undefined) res.render('error', {
        message: '유효하지 않은 문제입니다.'
      });
      connection.query("SELECT * FROM answer WHERE number = ?", [num], function(err, ans) {
        if (err) console.log(err);
        var existAnswer = false;
        var isSolved = false;
        var answer = -1;
        if (ans[0].answer != null) existAnswer = true;
        if (solved.indexOf(parseInt(num)) > -1) {
          isSolved = true;
          answer = ans[0].answer;
        }
        res.render('problem', {
          title: defaultTitle,
          problem: row,
          existAnswer: existAnswer,
          isSolved: isSolved,
          answer: answer,
          user: req.user,
          flash: req.flash('registerMessage')
        });
      });
    });
  });
});

router.post('/submit', function(req, res, next) {
  var backURL = req.header('Referer') || '/';
  console.log(req.body);

  var recaptchaCheck = true;
  // req.body: no, guess, g-recaptcha-response



  if (!recaptchaCheck) {
    //todo check recaptcha
  } else if (!req.body.guess.isNumber()) {
    //todo check not a NUMBER
    req.flash('registerMessage', '답은 숫자만 입력하세요');
    res.redirect(backURL);
  } else {
    connection.query("SELECT * FROM answer WHERE number = ?", [req.body.no], function(err, ans) {
      if (err) console.log(err);
      var existAnswer = ans[0].answer != null;
      var insertQuery = "INSERT INTO submit ( usr_id, no, answer, submitted_at, solve_flag, pending_flag ) values (?,?,?,?,?,?)";
      var insertUsrid = req.user.usr_id;
      var insertNo = req.body.no;
      var insertAnswer = req.body.guess;
      var insertSubmittedAt = formatDate(new Date());
      var insertSolveFlag = 0;
      var insertPendingFlag = 0;
      if (existAnswer) {
        if (req.body.guess == ans[0].answer) {
          // correct answer
          insertSolveFlag = 1;
          req.flash('registerMessage', '정답입니다!');
        } else {
          // wrong!
          req.flash('registerMessage', '틀렸습니다!');
        }
      } else {
        insertPendingFlag = 1;
      }
      connection.query(insertQuery, [insertUsrid, insertNo, insertAnswer, insertSubmittedAt, insertSolveFlag, insertPendingFlag], function(err, rows) {
        if (err) console.log(err);
        res.redirect('/get-solved-problems');
      });
    });
  }

  // if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
  //
  // }
  //
  // var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // request(verificationUrl,function(error,response,body) {
  //   body = JSON.parse(body);
  //   if(body.success !== undefined && !body.success) {
  //     console.log('success');
  //     res.redirect('/');
  //   }
  //   console.log('fail');
  //   // warning
  // });
})

module.exports = router;
