// posts router
const express = require('express');
const controller = require('./controller');
const asyncWrapper = require('../../middleware/async-wrapper');
const errorBuilder = require('../../modules/error-builder');
const models = require('../../models');
const replies = require('./replies');

const router = express.Router();

/**
 * @api {get} /api/posts/length?category={STRING}&problem_id={int}&user_id={string} Get Total Number of page & posts
 * @apiGroup posts
 * @apiSuccess {Number} numberOfPages page 개수
 * @apiSuccess {Number} numberOfPost 총 posts 개수
 */
router.get('/length', asyncWrapper(controller.getCount));

/**
 * @api {get} /api/posts/?page={number}&category={STRING}&problem_id={int}&user_id={string} Get Posts List
 * @apiGroup posts
 * @apiSuccess (Success) {Object[]} posts
 * @apiSuccess (Success) {Number} posts.id
 * @apiSuccess (Success) {String} posts.title 제목
 * @apiSuccess (Success) {String} posts.category 카테고리 (TRANS, MISS, FREE 존재)
 * @apiSuccess (Success) {String} posts.content 내용
 * @apiSuccess (Success) {Number} posts.problem_id 문제번호 (null 가능)
 * @apiSuccess (Success) {Date} posts.created_at 글쓴 날짜
 * @apiSuccess (Success) {Date} posts.updated_at 글 업데이트 날짜
 * @apiSuccess (Success) {Number} posts.user_id 고유 번호
 * @apiSuccess (Success) {Object} posts.user
 * @apiSuccess (Success) {Number} posts.user.id 고유 번호
 * @apiSuccess (Success) {String} posts.user.uid 사용자 닉
 * @apiSuccess (Success) {Object[]} posts.postReplies 이거 길이로 댓글 갯수 구하셈
 */
router.get('/', asyncWrapper(controller.getList));

/**
 * @api {get} /api/posts/:id Get Post
 * @apiGroup posts
 * @apiSuccess (Success) {Object} post
 * @apiSuccess (Success) {Number} post.id
 * @apiSuccess (Success) {String} post.title 제목
 * @apiSuccess (Success) {String} post.category 카테고리 (TRANS, MISS, FREE 존재)
 * @apiSuccess (Success) {String} post.content 내용
 * @apiSuccess (Success) {Number} post.problem_id 문제번호 (null 가능)
 * @apiSuccess (Success) {Date} post.created_at 글쓴 날짜
 * @apiSuccess (Success) {Date} post.updated_at 글 업데이트 날짜
 * @apiSuccess (Success) {Number} post.user_id 글쓴이 id
 * @apiSuccess (Success) {Object} post.user
 * @apiSuccess (Success) {Number} post.user.id 고유 번호
 * @apiSuccess (Success) {String} post.user.uid 사용자 닉
 * @apiSuccess (Success) {Object[]} post.postReplies 댓글들
 * @apiSuccess (Success) {Number} post.postReplies.id 댓글 id
 * @apiSuccess (Success) {String} post.postReplies.content 댓글 내용
 * @apiSuccess (Success) {Date} post.postReplies.created_at 댓글 날짜
 * @apiSuccess (Success) {Date} post.postReplies.updated_at 댓글 업뎃 날짜
 * @apiSuccess (Success) {Number} post.postReplies.user_id 댓글 쓴 id
 * @apiSuccess (Success) {Object} post.postReplies.user
 * @apiSuccess (Success) {Number} post.postReplies.user.id 고유 번호
 * @apiSuccess (Success) {String} post.postReplies.user.uid 사용자 닉
 */
router.get('/:id', asyncWrapper(controller.getOne));

/**
 * @api {post} /api/posts/ Post a Post
 * @apiGroup posts
 * @apiParam {String} title 제목
 * @apiParam {string} category 카테고리 (TRANS, MISS, FREE 존재)
 * @apiParam {string} content 내용
 * @apiParam {number} problem_id 문제 번호 (이거 null 이면 아예 problem_id 넣지 마셈)
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "이거좀 보셈 이상함",
 *      "category": "MISS",
 *      "content": "저거좀 보셈 이상해",
 *      "problem_id": 3
 *    }
 * @apiSuccess (Success 200 로그인) {Boolean} success=true
 * @apiSuccess (Success 200 로그인) {Number} postId 새로 만들어진 post 아이디
 * @apiError (Error Not Login) {Boolean} error=true
 * @apiError (Error Not Login) {Number} status=401
 * @apiError (Error Not Login) {String} message="NotLogin"
 * @apiError (Category Error) {Boolean} error=true
 * @apiError (Category Error) {Number} status=406
 * @apiError (Category Error) {String} message="CategoryError" 카테고리가 이상하믄
 */
router.post('/', asyncWrapper(controller.post));

/**
 * @api {post} /api/posts/:id Update a Post
 * @apiGroup posts
 * @apiParam {String} title 제목
 * @apiParam {string} category 카테고리 (TRANS, MISS, FREE 존재)
 * @apiParam {string} content 내용
 * @apiParam {number} problem_id 문제 번호 (이거 null 이면 아예 problem_id 넣지 마셈)
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "이거좀 보셈 이상함",
 *      "category": "MISS",
 *      "content": "저거좀 보셈 이상해"
 *      "problem_id": 3
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
 * @apiError (Category Error) {Boolean} error=true
 * @apiError (Category Error) {Number} status=406
 * @apiError (Category Error) {String} message="CategoryError" 카테고리가 이상하믄
 */
router.post('/:id', asyncWrapper(controller.update));

/**
 * @api {delete} /api/posts/:id Delete a Posts
 * @apiGroup posts
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
 */
router.delete('/:id', asyncWrapper(controller.delete));

const preParamSetting = async (req,res, next) => {
  req.preParams = {};
  req.preParams.postId = req.params.id;

  const post = await models.post.findById(req.params.id);

  if (!post) {
    next(errorBuilder('NotFound', 404, true));
    return;
  }
  next();
};

router.use('/:id/replies', preParamSetting, replies);

module.exports = router;
