// problems router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {get} /problems/?page={number} Get Problem List
 * @apiGroup problems
 * @apiSuccess (Success 200 로그인) {Boolean} login=true
 * @apiSuccess (Success 200 로그인) {Object[]} problems
 * @apiSuccess (Success 200 로그인) {Number} problems.id
 * @apiSuccess (Success 200 로그인) {String} problems.title
 * @apiSuccess (Success 200 로그인) {String} problems.title_kr
 * @apiSuccess (Success 200 로그인) {Number} problems.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} problems.solver 정답자 수
 * @apiSuccess (Success 200 로그인) {Object[]} problems.submits 이 배열의 길이가 1이상이면 정답 맞춘거임
 * @apiSuccess (Success 200 비로그인) {Boolean} login=false
 * @apiSuccess (Success 200 비로그인) {Object[]} problems
 * @apiSuccess (Success 200 비로그인) {Number} problems.id
 * @apiSuccess (Success 200 비로그인) {String} problems.title
 * @apiSuccess (Success 200 비로그인) {String} problems.title_kr
 * @apiSuccess (Success 200 비로그인) {Number} problems.difficulty 난이도
 * @apiSuccess (Success 200 비로그인) {Number} problems.solver 정답자 수
 */
router.get('/', asyncWrapper(controller.getList));

/**
 * @api {get} /problems/page-length Get Total Number of page
 * @apiGroup problems
 * @apiSuccess {Number} numberOfPages page 개수
 */
router.get('/page-length', asyncWrapper(controller.getCount));

/**
 * @api {get} /problems/:id Get a Problem
 * @apiGroup problems
 * @apiParam {Number} id problem id
 * @apiSuccess (Success 200 로그인) {Boolean} login=true
 * @apiSuccess (Success 200 로그인) {Boolean} hasAnswer 문제에 답이 있는지
 * @apiSuccess (Success 200 로그인) {Boolean} hasKorean 번역 되있는지
 * @apiSuccess (Success 200 로그인) {Boolean} pending 제출 후 대기 상태인지
 * @apiSuccess (Success 200 로그인) {Boolean} solve 푼 문제인지 여부
 * @apiSuccess (Success 200 로그인) {String} answer 푼 문제면 답 들어가 있음
 * @apiSuccess (Success 200 로그인) {Object} problem
 * @apiSuccess (Success 200 로그인) {Number} problem.id
 * @apiSuccess (Success 200 로그인) {String} problem.title
 * @apiSuccess (Success 200 로그인) {String} problem.problem
 * @apiSuccess (Success 200 로그인) {String} problem.title_kr
 * @apiSuccess (Success 200 로그인) {String} problem.problem_kr
 * @apiSuccess (Success 200 로그인) {Number} problem.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} problem.solver 정답자 수
 * @apiSuccess (Success 200 비로그인) {Boolean} login=false
 * @apiSuccess (Success 200 비로그인) {Boolean} hasAnswer 문제에 답이 있는지
 * @apiSuccess (Success 200 비로그인) {Boolean} hasKorean 번역 되있는지
 * @apiSuccess (Success 200 비로그인) {Boolean} pending=false
 * @apiSuccess (Success 200 비로그인) {Boolean} solve=false
 * @apiSuccess (Success 200 비로그인) {String} answer="" 빈문자열
 * @apiSuccess (Success 200 비로그인) {Object} problem
 * @apiSuccess (Success 200 비로그인) {Number} problem.id
 * @apiSuccess (Success 200 비로그인) {String} problem.title
 * @apiSuccess (Success 200 비로그인) {String} problem.problem
 * @apiSuccess (Success 200 비로그인) {String} problem.title_kr
 * @apiSuccess (Success 200 비로그인) {String} problem.problem_kr
 * @apiSuccess (Success 200 비로그인) {Number} problem.difficulty 난이도
 * @apiSuccess (Success 200 비로그인) {Number} problem.solver 정답자 수
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 */
router.get('/:id', asyncWrapper(controller.getOne));


module.exports = router;
