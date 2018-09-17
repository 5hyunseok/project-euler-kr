// router index
const express = require('express');
const users = require('./users');
const problems = require('./problems');

const router = express.Router();

router.use('/users', users);
router.use('/problems', problems);

module.exports = router;
