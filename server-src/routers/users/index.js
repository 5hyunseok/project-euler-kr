// user router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {post} /api/users/ Create a user
 * @apiGroup users
 * @apiParam {string} uid user unique id
 * @apiParam {string} password
 * @apiParam {string} recaptchaResponse
 * @apiParamExample {json} Request-Example:
 *    {
 *      "uid": "idid",
 *      "password": "password",
 *      "recaptchaResponse": "ahuitowe5hyoulwhu34etiot"
 *    }
 * @apiSuccess {Boolean} success=true
 * @apiError (Error Duplicated id) {Boolean} error=true
 * @apiError (Error Duplicated id) {Number} status=409
 * @apiError (Error Duplicated id) {String} message="IdExists"
 * @apiError (Error Id Format Error) {Boolean} error=true
 * @apiError (Error Id Format Error) {Number} status=403
 * @apiError (Error Id Format Error) {String} message="IdFormatError"
 * @apiError (Error Password Format Error) {Boolean} error=true
 * @apiError (Error Password Format Error) {Number} status=403
 * @apiError (Error Password Format Error) {String} message="PasswordFormatError"
 * @apiError (Recaptcha Error) {Boolean} error=true
 * @apiError (Recaptcha Error) {Number} status=402
 * @apiError (Recaptcha Error) {String} message="recaptchaError"
 */
router.post('/', asyncWrapper(controller.postIndex));

/**
 * @api {post} /api/users/login Login
 * @apiGroup users
 * @apiParam {string} uid
 * @apiParam {string} password
 * @apiParam {string} recaptchaResponse
 * @apiParamExample {json} Request-Example:
 *    {
 *      "uid": "idid",
 *      "password": "password",
 *      "recaptchaResponse": "ahuitowe5hyoulwhu34etiot"
 *    }
 * @apiSuccess {String} token Login JWT
 * @apiError (Error Wrong Information) {Boolean} error=true
 * @apiError (Error Wrong Information) {Number} status=403
 * @apiError (Error Wrong Information) {String} message="NotMatch"
 * @apiError (Recaptcha Error) {Boolean} error=true
 * @apiError (Recaptcha Error) {Number} status=402
 * @apiError (Recaptcha Error) {String} message="recaptchaError"
 */
router.post('/login', asyncWrapper(controller.login));

/**
 * @api {put} /api/users/password Change Password
 * @apiGroup users
 * @apiParam {string} curPassword
 * @apiParam {string} newPassword
 * @apiParamExample {json} Request-Example:
 *    {
 *      "curPassword": "mypassword123",
 *      "newPassword": "asdasdasd"
 *    }
 * @apiSuccess {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Wrong Information) {Boolean} error=true curPassword가 틀렸을 때
 * @apiError (Error Wrong Information) {Number} status=403
 * @apiError (Error Wrong Information) {String} message="NotMatch"
 * @apiError (Error Password Format Error) {Boolean} error=true newPassword가 비밀번호 형식에 안맞을때
 * @apiError (Error Password Format Error) {Number} status=403
 * @apiError (Error Password Format Error) {String} message="PasswordFormatError"
 */
router.put('/password', asyncWrapper(controller.updatePassword));

/**
 * @api {get} /api/users/my My Page Information
 * @apiGroup users
 * @apiSuccess (Success 200 로그인) {Object[]} problemsList
 * @apiSuccess (Success 200 로그인) {Number} problemsList.id
 * @apiSuccess (Success 200 로그인) {String} problemsList.title
 * @apiSuccess (Success 200 로그인) {String} problemsList.title_kr
 * @apiSuccess (Success 200 로그인) {Number} problemsList.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} problemsList.solver 정답자 수
 * @apiSuccess (Success 200 로그인) {Object[]} problems.submits 이 배열의 길이가 1이상이면 정답 맞춘거임
 * @apiSuccess (Success 200 로그인) {Object[]} problems.pending_submits 이 배열 길이가 1이상이면 팬딩 됨
 * @apiSuccess (Success 200 로그인) {Object[]} pendingProblemList
 * @apiSuccess (Success 200 로그인) {Number} pendingProblemList.id
 * @apiSuccess (Success 200 로그인) {String} pendingProblemList.title
 * @apiSuccess (Success 200 로그인) {String} pendingProblemList.title_kr
 * @apiSuccess (Success 200 로그인) {Number} pendingProblemList.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} pendingProblemList.solver 정답자 수
 * @apiSuccess (Success 200 로그인) {Object[]} pendingProblemList.pending_submits 팬딩된 제출 정보
 * @apiSuccess (Success 200 로그인) {Number} pendingProblemList.pending_submits.answer 제출 답
 * @apiSuccess (Success 200 로그인) {Date} pendingProblemList.pending_submits.submit_date 제출 시간
 * @apiSuccess (Success 200 로그인) {Number} threadCount 내가 쓴 포스트 수
 * @apiSuccess (Success 200 로그인) {Number} threadStarCount 내가 받은 좋아요 수
 * @apiSuccess (Success 200 로그인) {Object} user 내 정보
 * @apiSuccess (Success 200 로그인) {Number} user.id 내 정보
 * @apiSuccess (Success 200 로그인) {String} user.uid 내 정보
 * @apiSuccess (Success 200 로그인) {String} user.short_message 내 정보
 * @apiSuccess (Success 200 로그인) {Number} user.closed_flag 정보 공개 / 비공개 (공개: 0, 비공개: 1)
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 */
router.get('/my', asyncWrapper(controller.my));

/**
 * @api {get} /api/users/rating-list Rating List
 * @apiGroup users
 * @apiSuccess (Success 200) {Object[]} ratingList
 * @apiSuccess (Success 200) {Number} ratingList.rank 순위
 * @apiSuccess (Success 200) {Number} ratingList.user_id 유저 번호
 * @apiSuccess (Success 200) {String} ratingList.uid 유저 아이디
 * @apiSuccess (Success 200) {String} ratingList.short_message 한줄 인사
 * @apiSuccess (Success 200) {Number} ratingList.solve_count 푼 문제 수
 * @apiSuccess (Success 200) {Number} ratingList.post_count 쓴 글 수
 * @apiSuccess (Success 200) {Number} ratingList.thread_star_count 별 받은 겟수
 * @apiSuccess (Success 200) {Number} ratingList.solve_ratio 정답 비율
 * @apiSuccess (Success 200) {Object} myRating 로그인 안되있음 null 임
 * @apiSuccess (Success 200) {Number} myRating.rank 순위
 * @apiSuccess (Success 200) {Number} myRating.user_id 유저 번호
 * @apiSuccess (Success 200) {String} myRating.uid 유저 아이디
 * @apiSuccess (Success 200) {String} myRating.short_message  한줄 인사
 * @apiSuccess (Success 200) {Number} myRating.solve_count 푼 문제 수
 * @apiSuccess (Success 200) {Number} myRating.post_count 쓴 글 수
 * @apiSuccess (Success 200) {Number} myRating.thread_star_count 별 받은 겟수
 * @apiSuccess (Success 200) {Number} myRating.solve_ratio 정답 비율
 */
router.get('/rating-list', asyncWrapper(controller.ratingList));

/**
 * @api {get} /api/users/:id User Page Information
 * @apiGroup users
 * @apiSuccess (Success 200 로그인) {Number} closed_flag 정보 공개 / 비공개 (공개: 0, 비공개: 1)
 * @apiSuccess (Success 200 로그인) {Object} user 유저 정보
 * @apiSuccess (Success 200 로그인) {Number} user.id 아디
 * @apiSuccess (Success 200 로그인) {String} user.uid  아디
 * @apiSuccess (Success 200 로그인) {String} user.short_message 인사말
 * @apiSuccess (Success 200 로그인) {Number} threadCount  쓴 포스트 수
 * @apiSuccess (Success 200 로그인) {Number} threadStarCount  받은 좋아요 수
 * @apiSuccess (Success 200 로그인) {Object[]} problemsList
 * @apiSuccess (Success 200 로그인) {Number} problemsList.id
 * @apiSuccess (Success 200 로그인) {String} problemsList.title
 * @apiSuccess (Success 200 로그인) {String} problemsList.title_kr
 * @apiSuccess (Success 200 로그인) {Number} problemsList.difficulty 난이도
 * @apiSuccess (Success 200 로그인) {Number} problemsList.solver 정답자 수
 * @apiSuccess (Success 200 로그인) {Object[]} problems.submits 이 배열의 길이가 1이상이면 정답 맞춘거임
 * @apiSuccess (Success 200 로그인) {Object[]} problems.pending_submits 이 배열 길이가 1이상이면 팬딩 됨
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 */
router.get('/:id', asyncWrapper(controller.getOther));

/**
 * @api {put} /api/users/info Change User Information
 * @apiGroup users
 * @apiParam {string} shortMessage
 * @apiParamExample {json} Request-Example:
 *    {
 *      "shortMessage": "하이!~~!~~!~~!"
 *    }
 * @apiSuccess {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Short Message Too Long) {Boolean} error=true 한줄인사가 300자 이상
 * @apiError (Error Short Message Too Long) {Number} status=400
 * @apiError (Error Short Message Too Long) {String} message="ShortMessageTooLong"
 */
router.put('/info', asyncWrapper(controller.update));

/**
 * @api {put} /api/users/closed-flag Change User Information open / close
 * @apiGroup users
 * @apiParam {Number} closedFlag 1: close, 0: open
 * @apiParamExample {json} Request-Example:
 *    {
 *      "closedFlag": 1
 *    }
 * @apiSuccess {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Type) {Boolean} error=true 이상한 값이면
 * @apiError (Error Type) {Number} status=400
 * @apiError (Error Type) {String} message="TypeError"
 */
router.put('/closed-flag', asyncWrapper(controller.updateClosedFlag));


module.exports = router;
