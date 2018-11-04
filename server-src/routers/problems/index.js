// problems router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');
const threadAuth = require('../../middleware/thread-auth');
const threads = require('./threads');

const router = express.Router();

/**
 * @api {get} /api/problems/?page={number} Get Problem List
 * @apiGroup problems
 * @apiSuccess (Success 200 로그인) {Boolean} login=true
 * @apiSuccess (Success 200 로그인) {Object[]} problems
 * @apiSuccess (Success 200 로그인) {Number} problems.id
 * @apiSuccess (Success 200 로그인) {String} problems.title
 * @apiSuccess (Success 200 로그인) {String} problems.title_kr
 * @apiSuccess (Success 200 로그인) {Number} problems.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} problems.solver 정답자 수
 * @apiSuccess (Success 200 로그인) {Object[]} problems.submits 이 배열의 길이가 1이상이면 정답 맞춘거임
 * @apiSuccess (Success 200 로그인) {Object[]} problems.threads 이 배열의 길이로 포스트 갯수 확인하셈 (sequelize 쓰는 법 넘나 어려워서 못하갯음)
 * @apiSuccess (Success 200 비로그인) {Boolean} login=false
 * @apiSuccess (Success 200 비로그인) {Object[]} problems
 * @apiSuccess (Success 200 비로그인) {Number} problems.id
 * @apiSuccess (Success 200 비로그인) {String} problems.title
 * @apiSuccess (Success 200 비로그인) {String} problems.title_kr
 * @apiSuccess (Success 200 비로그인) {Number} problems.difficulty 난이도
 * @apiSuccess (Success 200 비로그인) {Number} problems.solver 정답자 수
 * @apiSuccess (Success 200 비로그인) {Object[]} problems.threads 이 배열의 길이로 포스트 갯수 확인하셈 (sequelize 쓰는 법 넘나 어려워서 못하갯음)
 */
router.get('/', asyncWrapper(controller.getList));

/**
 * @api {get} /api/problems/length Get Total Number of page & problem
 * @apiGroup problems
 * @apiSuccess {Number} numberOfPages page 개수
 * @apiSuccess {Number} numberOfProblem 총 문제 개수
 */
router.get('/length', asyncWrapper(controller.getCount));

/**
 * @api {get} /api/problems/recent Get The Most Recent 10 Problems List
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
router.get('/recent', asyncWrapper(controller.recent));

/**
 * @api {get} /api/problems/:id Get a Problem
 * @apiGroup problems
 * @apiParam {Number} id problem id
 * @apiSuccess (Success 200 로그인) {Boolean} login=true
 * @apiSuccess (Success 200 로그인) {Boolean} hasAnswer 문제에 답이 있는지
 * @apiSuccess (Success 200 로그인) {Boolean} hasKorean 번역 되있는지
 * @apiSuccess (Success 200 로그인) {Boolean} pending 제출 후 대기 상태인지
 * @apiSuccess (Success 200 로그인) {Boolean} solve 푼 문제인지 여부
 * @apiSuccess (Success 200 로그인) {String} submitAnswer (팬딩 됬거나 맞았을 때) 제출한 답
 * @apiSuccess (Success 200 로그인) {Date} submitDate (팬딩 됬거나 맞았을 때) 제출 시간
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
 * @apiSuccess (Success 200 비로그인) {String} submitAnswer="" 빈문자열
 * @apiSuccess (Success 200 비로그인) {Date} submitDate=null
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

/**
 * @api {post} /api/problems/:id/submit Submit an Answer
 * @apiGroup problems
 * @apiParam {Number} id problem id
 * @apiParam {string} answer
 * @apiParamExample {json} Request-Example:
 *    {
 *      "answer": "23"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} pending 팬딩됫냐
 * @apiSuccess (Success 200 로그인) {Boolean} isCorrect 답이 맞았냐
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Already Solved) {Boolean} error=true
 * @apiError (Error Already Solved) {Number} status=412
 * @apiError (Error Already Solved) {String} message="Solved"
 * @apiError (Error Within 30 seconds) {Boolean} error=true
 * @apiError (Error Within 30 seconds) {Number} status=412
 * @apiError (Error Within 30 seconds) {String} message="Within30Seconds"
 * @apiError (Error Within 30 seconds) {Boolean} error=true
 * @apiError (Error Within 30 seconds) {Number} status=412
 * @apiError (Error Within 30 seconds) {String} message="Within30Seconds"
 */
router.post('/:id/submit', asyncWrapper(controller.submit));

const preParamSetting = (req,res, next) => {
  req.preParams = {};
  req.preParams.problemId = req.params.id;
  next();
};

router.use('/:id/threads', preParamSetting, asyncWrapper(threadAuth), threads);

module.exports = router;
