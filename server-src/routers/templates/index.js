// - router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');

const router = express.Router();

router.post('/', asyncWrapper(controller.postIndex));


module.exports = router;
