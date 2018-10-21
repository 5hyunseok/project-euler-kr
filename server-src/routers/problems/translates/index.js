// translates router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {post} /api/problems/:id/translates Submit Translate
 * @apiGroup translate
 * @apiParam {String} title 번역된 제목
 * @apiParam {string} problem 번역된 문제
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "3 또는 5의 배수",
 *      "problem": "<p>10 이하의 자연수 중 3 또는 5의 배수를 나열하면 3, 5, 6, 9다. 그리고 그 배수들의 합은 23이다.</p>
1000 이하의 자연수 중 3 또는 5의 배수의 총합을 구하여라.</p>"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 */
router.post('/', asyncWrapper(controller.translate));



module.exports = router;
