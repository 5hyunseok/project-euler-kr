// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var bcrypt = require('bcrypt-nodejs');
var mysql_dbc = require('./db_con')();
var connection = mysql_dbc.init();

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log(user);
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM user WHERE id = ? ",[id], function(err, rows){
      done(err, rows[0]);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================

  passport.use(
    'local-signup',
    new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      connection.query("SELECT * FROM user WHERE usr_id = ?",[username], function(err, rows) {
        if (err)
          return done(err);
        if (rows.length) {
          return done(null, false, req.flash('registerMessage', '이미 사용중인 아이디입니다.'));
        } else {
          if (req.body.password != req.body.cpassword) {
            return done(null, false, req.flash('registerMessage', '비밀번호가 일치하지 않습니다.'))
          } else {
            // if there is no user with that username
            // create the user
            var newUserMysql = {
                username: username,
                password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
            };

            var insertQuery = "INSERT INTO user ( usr_id, password ) values (?,?)";

            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function(err, rows) {
                newUserMysql.id = rows.insertId;
                return done(null, newUserMysql);
            });
          }
        }
      });
    })
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    'local-login',
    new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
      connection.query("SELECT * FROM user WHERE usr_id = ?",[username], function(err, rows){
        if (err)
          return done(err);
        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', '존재하지 않는 아이디입니다.')); // req.flash is the way to set flashdata using connect-flash
        }

        // if the user is found but the password is wrong
        if (!bcrypt.compareSync(password, rows[0].password))
          return done(null, false, req.flash('loginMessage', '잘못된 비밀번호입니다.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, rows[0]);
      });
    })
  );
};
