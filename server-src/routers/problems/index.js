// problems router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

/**
 * @api {get} /problems/?page={number} Get Problem List
 * @apiGroup problems
 * @apiSuccess {Object[]} problems
 * @apiSuccess {Number} problems.id
 * @apiSuccess {String} problems.title
 * @apiSuccess {String} problems.title_kr
 * @apiSuccess {Number} problems.difficulty 난이도
 * @apiSuccess {Number} problems.solver 정답자 수
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
 * @apiSuccess {Object} problem
 * @apiError (Error Duplicated id) {Boolean} error=true
 * @apiError (Error Duplicated id) {Number} status=404
 * @apiError (Error Duplicated id) {String} message="NotFound"
 */
router.get('/:id', asyncWrapper(controller.getOne));


module.exports = router;
