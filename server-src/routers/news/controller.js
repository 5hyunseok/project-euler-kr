// - controller
const errorBuilder = require('../../modules/error-builder');
const models = require('../../models');

exports.index = async (req, res) => {
  const news = await models.news.findAll({
    where: { recent_flag: 1 },
    order: [['created_at', 'DESC']],
  });

  res.json({ news });
};

exports.more = async (req, res) => {
  const news = await models.news.findAll({
    where: { recent_flag: 0 },
    order: [['created_at', 'DESC']],
  });

  res.json({ news });
};

exports.post = async (req ,res) => {
  let { title, content } = req.body;

  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }
  if (req.decoded.type !== 'ADMIN') {
    throw errorBuilder('Forbidden', 403, true);
  }

  await models.news.create({
    title, content,
  });

  res.json({ success: true });
};
