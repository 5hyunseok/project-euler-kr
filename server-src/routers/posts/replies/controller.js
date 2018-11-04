// - controller
const errorBuilder = require('../../../modules/error-builder');
const models = require('../../../models');

exports.post = async (req, res) => {
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const { content } = req.body;

  await models.postReply.create({
    content,
    post_id: req.preParams.postId,
    user_id: req.decoded.id,
  });

  res.json({ success: true });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const reply = await models.postReply.findById(id);
  if (!reply) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (reply.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }

  const { content } = req.body;

  reply.content = content;
  await reply.save();
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const reply = await models.postReply.findById(id);
  if (!reply) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (reply.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }

  await reply.destroy();
  res.json({ success: true });
};
