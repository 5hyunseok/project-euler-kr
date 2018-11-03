// - router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {get} /api/auth/token-validation Token Validation
 * @apiGroup Auth
 * @apiSuccess (Success 200) {Boolean} success=true
 * @apiError (Error Login Expired) {Boolean} error=true
 * @apiError (Error Login Expired) {Number} status=401
 * @apiError (Error Login Expired) {String} message="Expired"
 * @apiError (Error Token Error) {Boolean} error=true
 * @apiError (Error Token Error) {Number} status=401
 * @apiError (Error Token Error) {String} message="TokenError"
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 */
router.get('/token-validation', asyncWrapper(controller.tokenValidation));


module.exports = router;
