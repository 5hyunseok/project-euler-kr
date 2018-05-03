module.exports = (function () {
  return {
    local: { // localhost
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'dhgustjr',
      database: 'euler'
    },
    prod: { // production info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    },
    heroku: {
      host: process.env.DBHOST,
      port: 3306,
      user: root,
      password: process.env.DBPW,
      database: 'euler'
    }
  }
})();
