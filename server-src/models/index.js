const fs = require('fs');
const path = require('path');
const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: config.db.logging,
  operatorsAliases: false,
});
const db = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.projection = {
  problem: {
    list: ['id', 'title', 'title_kr', 'difficulty', 'solver'],
    one: ['id', 'title', 'problem', 'title_kr', 'problem_kr', 'difficulty', 'solver', 'mathjax'],
  },
  user: {
    thread: ['id', 'uid', 'short_message'],
  },
  submit: {
    pending: ['answer', ['updated_at', 'submit_date']],
  },
};

module.exports = db;

