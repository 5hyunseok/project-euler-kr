// router index
const express = require('express');
const users = require('./users');
const problems = require('./problems');

const router = express.Router();

router.use('/users', users);
router.use('/problems', problems);

module.exports = router;


/**
 * @api {get/post} /모든API token Check
 * @apiGroup ALL API
 * @apiError (Error Login Expired) {Boolean} error=true
 * @apiError (Error Login Expired) {Number} status=401
 * @apiError (Error Login Expired) {String} message="Expired"
 * @apiError (Error Token Error) {Boolean} error=true
 * @apiError (Error Token Error) {Number} status=401
 * @apiError (Error Token Error) {String} message="TokenError"
 */
