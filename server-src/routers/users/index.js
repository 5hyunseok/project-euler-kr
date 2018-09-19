// user router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {post} /users/ Create a user
 * @apiGroup users
 * @apiParam {string} uid user unique id
 * @apiParam {string} password
 * @apiParamExample {json} Request-Example:
 *    {
 *      "uid": "idid",
 *      "password": "password"
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
 */
router.post('/', asyncWrapper(controller.postIndex));

/**
 * @api {post} /users/login Login
 * @apiGroup users
 * @apiParam {string} uid
 * @apiParam {string} password
 * @apiParamExample {json} Request-Example:
 *    {
 *      "uid": "idid",
 *      "password": "password"
 *    }
 * @apiSuccess {String} token Login JWT
 * @apiError (Error Wrong Information) {Boolean} error=true
 * @apiError (Error Wrong Information) {Number} status=403
 * @apiError (Error Wrong Information) {String} message="NotMatch"
 */
router.post('/login', asyncWrapper(controller.login));


module.exports = router;
