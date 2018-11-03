// threads router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {post} /api/posts/:post_id/replies Post a Reply
 * @apiGroup posts replies
 * @apiParam {string} content 내용
 * @apiParamExample {json} Request-Example:
 *    {
 *      "content": "굿 굿"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 */
router.post('/', asyncWrapper(controller.post));

/**
 * @api {post} /api/posts/:post_id/replies/:reply_id Update a Reply
 * @apiGroup posts replies
 * @apiParam {string} content 내용
 * @apiParamExample {json} Request-Example:
 *    {
 *      "content": "굿 굿2"
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Auth Error2) {Boolean} error=true
 * @apiError (Error Auth Error2) {Number} status=403
 * @apiError (Error Auth Error2) {String} message="Forbidden" 댓글 쓴이가 아닐떄
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 */
router.post('/:id', asyncWrapper(controller.update));

/**
 * @api {delete} /api/posts/:post_id/replies/:reply_id Delete a Reply
 * @apiGroup posts replies
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiError (Error Auth Error2) {Boolean} error=true
 * @apiError (Error Auth Error2) {Number} status=403
 * @apiError (Error Auth Error2) {String} message="Forbidden" 댓글 쓴이가 아닐떄
 * @apiError (Error Not Found) {Boolean} error=true
 * @apiError (Error Not Found) {Number} status=404
 * @apiError (Error Not Found) {String} message="NotFound"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 */
router.delete('/:id', asyncWrapper(controller.delete));

module.exports = router;
