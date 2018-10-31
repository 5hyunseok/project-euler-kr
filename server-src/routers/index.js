// router index
const express = require('express');
const errorBuilder = require('../modules/error-builder');
const users = require('./users');
const problems = require('./problems');
const news = require('./news');
const posts = require('./posts');


const router = express.Router();

router.use('/users', users);
router.use('/problems', problems);
router.use('/news', news);
router.use('/posts', posts);

// 404 handler
router.use((req, res, next) => {
  next(errorBuilder('Not Found', 404, true));
});

module.exports = router;


/**
 * @api {get/post} /api/모든API token Check
 * @apiGroup ALL API
 * @apiHeaderExample {String} Login JWT (HTTP Header):
 *  {
 *    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidWlkIjoiYWRzZCIsInR5cGUiOiJVU0VSIiwiaWF0IjoxNTM4MjAwNjgwLCJleHAiOjE1MzgyNTEwODAsImlzcyI6ImV1bGVyIiwic3ViIjoibG9naW5JbmZvIn0.ZQGfwQ41kzn-Eug2Ja5A3m06UAmihvgMWReIge8PYNg"
 *  }
 * @apiError (Error Login Expired) {Boolean} error=true
 * @apiError (Error Login Expired) {Number} status=401
 * @apiError (Error Login Expired) {String} message="Expired"
 * @apiError (Error Token Error) {Boolean} error=true
 * @apiError (Error Token Error) {Number} status=401
 * @apiError (Error Token Error) {String} message="TokenError"
 */
