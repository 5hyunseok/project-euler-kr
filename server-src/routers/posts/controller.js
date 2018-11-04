// - controller
const errorBuilder = require('../../modules/error-builder');
const models = require('../../models');

const postPageSize = 20;

// TODO:: filter
exports.getCount = async (req, res) => {
  const where = {};
  if (req.query.category) {
    where.category = req.query.category;
  }
  if (req.query.problem_id) {
    where.problem_id = parseInt(req.query.problem_id, 10);
  }
  if (req.query.user_id) {
    const user = await models.user.findOne({
      where: { uid: req.query.user_id },
    });
    if (!user) {
      where.user_id = -1;
    } else {
      where.user_id = user.id;
    }
  }

  const numberOfPost = await models.post.count({
    where
  });
  const numberOfPages = Math.ceil(numberOfPost / postPageSize);

  res.json({ numberOfPages, numberOfPost });
};

exports.getList = async (req, res) => {
  let pageIndex = 1;
  const where = {};
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }
  if (req.query.category) {
    where.category = req.query.category;
  }
  if (req.query.problem_id) {
    where.problem_id = parseInt(req.query.problem_id, 10);
  }
  if (req.query.user_id) {
    const user = await models.user.findOne({
      where: { uid: req.query.user_id },
    });
    if (!user) {
      where.user_id = -1;
    } else {
      where.user_id = user.id;
    }
  }

  const posts = await models.post.findAll({
    offset: (pageIndex - 1) * postPageSize,
    limit: postPageSize,
    where,
    include: [{
      model: models.user,
      attributes: models.projection.user.thread,
    }, {
      model: models.postReply,
      attributes: ['id'],
    }],
    order: [['created_at', 'DESC']],
  });
  res.json({ posts });
};

exports.getOne = async (req, res) => {
  const id = req.params.id;

  const post = await models.post.findById(id, {
    include: [{
      model: models.user,
      attributes: models.projection.user.thread,
    }, {
      model: models.postReply,
      include: [{
        model: models.user,
        attributes: models.projection.user.thread,
      }],
    }],
  });

  res.json({ post });
};

exports.post = async (req, res) => {
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const { title, category, content, problem_id } = req.body;

  if (category !== 'TRANS' && category !== 'MISS' && category !== 'FREE') {
    throw errorBuilder('CategoryError', 406, true);
  }

  const post = await models.post.create({
    title,
    category,
    content,
    problem_id,
    user_id: req.decoded.id,
  });

  res.json({ success: true, postId: post.id });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const post = await models.post.findById(id);
  if (!post) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (post.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }
  const { title, category, content, problem_id } = req.body;

  if (category !== 'TRANS' && category !== 'MISS' && category !== 'FREE') {
    throw errorBuilder('CategoryError', 406, true);
  }

  post.category = category;
  post.title = title;
  post.content = content;
  post.problem_id = parseInt(problem_id, 10);

  await post.save();
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const post = await models.post.findById(id);
  if (!post) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (post.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }

  await post.destroy();
  res.json({ success: true });
};
