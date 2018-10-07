// - router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {get} /api/news/ Get Recent News
 * @apiGroup News
 * @apiSuccess (Success 200) {Object[]} news
 * @apiSuccess (Success 200) {Number} news.id 번호
 * @apiSuccess (Success 200) {String} news.title 제목
 * @apiSuccess (Success 200) {String} news.content 내용
 * @apiSuccess (Success 200) {Number} news.recent_flag=1
 * @apiSuccess (Success 200) {Date} news.created_at 뉴스 날짜
 */
router.get('/', asyncWrapper(controller.index));

/**
 * @api {get} /api/news/more Get More News
 * @apiGroup News
 * @apiSuccess (Success 200) {Object[]} news
 * @apiSuccess (Success 200) {Number} news.id 번호
 * @apiSuccess (Success 200) {String} news.title 제목
 * @apiSuccess (Success 200) {String} news.content 내용
 * @apiSuccess (Success 200) {Number} news.recent_flag=0
 * @apiSuccess (Success 200) {Date} news.created_at 뉴스 날짜
 */
router.get('/more', asyncWrapper(controller.more));

/**
 * @api {post} /api/news/ Post News
 * @apiGroup News
 * @apiParam {string} title 뉴스 제목
 * @apiParam {string} content 뉴스 내용
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "채점 시작 합니다~",
 *      "content": "<p>진짜임</p>"
 *    }
 * @apiSuccess (Success 200) {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="Forbidden" admin 계정 아닐때
 */
router.post('/', asyncWrapper(controller.post));

module.exports = router;
