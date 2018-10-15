// problems router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {get} /api/problems/:id/threads/length Get Total Number of page & threads
 * @apiGroup threads
 * @apiSuccess {Number} numberOfPages page 개수
 * @apiSuccess {Number} numberOfThread 총 thread 개수
 */
router.get('/length', asyncWrapper(controller.getCount));

/**
 * @api {get} /api/problems/:id/threads/?page={number} Get Thread List
 * @apiGroup threads
 * @apiSuccess (Success 200 로그인) {Object[]} threads
 * @apiSuccess (Success 200 로그인) {Number} threads.id
 * @apiSuccess (Success 200 로그인) {String} threads.content 내용
 * @apiSuccess (Success 200 로그인) {String} threads.code 코드
 * @apiSuccess (Success 200 로그인) {Number} threads.star 추천수
 * @apiSuccess (Success 200 로그인) {Date} threads.created_at 글쓴 날짜
 * @apiSuccess (Success 200 로그인) {Date} threads.updated_at 글 업데이트 날짜
 * @apiSuccess (Success 200 로그인) {Object} threads.user 글쓴이 정보
 * @apiSuccess (Success 200 로그인) {Number} threads.user.id 고유 번호
 * @apiSuccess (Success 200 로그인) {String} threads.user.uid 닉
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.get('/', asyncWrapper(controller.getList));

module.exports = router;
