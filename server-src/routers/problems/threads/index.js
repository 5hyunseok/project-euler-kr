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
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.get('/length', asyncWrapper(controller.getCount));

/**
 * @api {get} /api/problems/:id/threads/?page={number} Get Thread List
 * @apiGroup threads
 * @apiSuccess (Success 200 로그인) {Object[]} threads
 * @apiSuccess (Success 200 로그인) {Number} threads.id
 * @apiSuccess (Success 200 로그인) {String} threads.content 내용
 * @apiSuccess (Success 200 로그인) {String} threads.code 코드
 * @apiSuccess (Success 200 로그인) {String} threads.language 코드 언어
 * @apiSuccess (Success 200 로그인) {Number} threads.star 추천수
 * @apiSuccess (Success 200 로그인) {Object[]} threads.threadStars 이 배열의 길이가 1이상이면 내가 추천함
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

/**
 * @api {post} /api/problems/:id/threads/ Post a Thread
 * @apiGroup threads
 * @apiParam {String} content 내용
 * @apiParam {string} code 코드
 * @apiParam {string} language 코드 언어
 * @apiParamExample {json} Request-Example:
 *    {
 *      "content": "이거 아래처럼 풀었음 ㅋㅋ ",
 *      "code": "#include < main() { void>}",
 *      "language": "c++"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.post('/', asyncWrapper(controller.post));

/**
 * @api {post} /api/problems/:id/threads/:thread_id Update a Thread
 * @apiGroup threads
 * @apiParam {String} content 내용
 * @apiParam {string} code 코드
 * @apiParam {string} language 코드 언어
 * @apiParamExample {json} Request-Example:
 *    {
 *      "content": "이거 아래처럼 풀었음 ㅋㅋ ",
 *      "code": "#include < main() { void>}",
 *      "language": "c++"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Auth Error2) {Boolean} error=true
 * @apiError (Error Auth Error2) {Number} status=403
 * @apiError (Error Auth Error2) {String} message="Forbidden" 글쓴이가 아닐떄
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.post('/:tid', asyncWrapper(controller.update));

/**
 * @api {delete} /api/problems/:id/threads/:thread_id Delete a Thread
 * @apiGroup threads
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Auth Error2) {Boolean} error=true
 * @apiError (Error Auth Error2) {Number} status=403
 * @apiError (Error Auth Error2) {String} message="Forbidden" 글쓴이가 아닐떄
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.delete('/:tid', asyncWrapper(controller.delete));

/**
 * @api {post} /api/problems/:id/threads/:thread_id/report Submit a Report for a Thread
 * @apiGroup threads
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.post('/:tid/report', asyncWrapper(controller.report));

/**
 * @api {post} /api/problems/:id/threads/:thread_id/star Submit a star to a Thread
 * @apiGroup threads
 * @apiSuccess (Success 200 로그인) {Boolean} isIncrease 추천 하면 true, 추천 취소면 false;
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Error Auth Error) {Boolean} error=true
 * @apiError (Error Auth Error) {Number} status=403
 * @apiError (Error Auth Error) {String} message="NotSolved" 아직 이 문제 못 풀었을때
 */
router.post('/:tid/star', asyncWrapper(controller.star));

module.exports = router;
