var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbPath = path.resolve(__dirname, 'eulerDB.db');
var db = new sqlite3.Database(dbPath);

module.exports = db;
