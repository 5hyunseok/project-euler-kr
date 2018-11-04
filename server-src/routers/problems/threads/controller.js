// - controller
const errorBuilder = require('../../../modules/error-builder');
const models = require('../../../models');

const threadPageSize = 25;

exports.getCount = async (req, res) => {
  const id = req.preParams.problemId;

  const numberOfThread = await models.thread.count({
    where: { problem_id: id },
  });
  const numberOfPages = Math.ceil(numberOfThread / threadPageSize);

  res.json({ numberOfPages, numberOfThread });
};

exports.getList = async (req, res) => {
  const id = req.preParams.problemId;
  let pageIndex = 1;
  if (req.query.page) {
    pageIndex = parseInt(req.query.page, 10);
  }

  const threads = await models.thread.findAll({
    offset: (pageIndex - 1) * threadPageSize,
    limit: threadPageSize,
    where: { problem_id: id },
    include: [{
      model: models.user,
      attributes: models.projection.user.thread,
    }, {
      model: models.threadStar,
      where: { user_id: req.decoded.id },
      attributes: ['user_id'],
      required: false,
    }],
    order: [['created_at', 'DESC']],
  });
  res.json({ threads });
};

exports.post = async (req, res) => {
  const id = req.preParams.problemId;

  const { content, code, language } = req.body;

  await models.thread.create({
    content,
    code,
    language,
    problem_id: id,
    user_id: req.decoded.id,
  });

  res.json({ success: true });
};

exports.update = async (req, res) => {
  const tid = req.params.tid;

  const thread = await models.thread.findById(tid);
  if (!thread) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (thread.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }
  const { content, code, language } = req.body;

  thread.content = content;
  thread.code = code;
  thread.language = language;
  await thread.save();

  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const tid = req.params.tid;

  const thread = await models.thread.findById(tid);
  if (!thread) {
    throw errorBuilder('NotFound', 404, true);
  }
  if (thread.user_id !== req.decoded.id) {
    throw errorBuilder('Forbidden', 403, true);
  }

  await thread.destroy();

  res.json({ success: true });
};

exports.report = async (req, res) => {
  const tid = req.params.tid;

  const thread = await models.thread.findById(tid);
  if (!thread) {
    throw errorBuilder('NotFound', 404, true);
  }

  const report = await models.threadReport.findOne({
    where: {
      thread_id: tid,
      user_id: req.decoded.id,
    },
  });

  if (!report) {
    await models.threadReport.create({
      thread_id: tid,
      user_id: req.decoded.id,
    });
  }

  res.json({ success: true });
};

exports.star = async (req, res) => {
  const tid = req.params.tid;

  const thread = await models.thread.findById(tid);
  if (!thread) {
    throw errorBuilder('NotFound', 404, true);
  }

  const star = await models.threadStar.findOne({
    where: {
      thread_id: tid,
      user_id: req.decoded.id,
    },
  });
  let isIncrease;

  if (star) {
    await star.destroy();
    thread.star -= 1;
    await thread.save();
    isIncrease = false;
  } else {
    await models.threadStar.create({
      thread_id: tid,
      user_id: req.decoded.id,
      thread_writer_id: thread.user_id,
    });
    thread.star += 1;
    await thread.save();
    isIncrease = true;
  }

  res.json({ isIncrease });
};
