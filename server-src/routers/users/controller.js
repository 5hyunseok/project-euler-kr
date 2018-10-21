// user controller
const errorBuilder = require('../../modules/error-builder');
const cryptoWrapper = require('../../modules/crypto-wrapper');
const auth = require('../../modules/auth');
const models = require('../../models');

exports.postIndex = async (req, res) => {
  const { uid, password } = req.body;
  const encrypted = cryptoWrapper.sha256Hex(password);

  if (!/^[0-9a-zA-Z._-]{1,32}$/.test(uid)) {
    throw errorBuilder('IdFormatError', 403, true);
  }
  if (password.length < 8 || password.length > 32) {
    throw errorBuilder('PasswordFormatError', 403, true);
  }

  const users = await models.user.findAll({ where: { uid } });
  if (users.length > 0) {
    throw errorBuilder('IdExists', 409, true);
  }

  await models.user.create({
    uid,
    password: encrypted,
  });

  res.json({ success: true });
};

exports.login = async (req, res) => {
  const { uid, password } = req.body;
  const encrypted = cryptoWrapper.sha256Hex(password);

  const user = await models.user.findOne({
    where: { uid, password: encrypted },
  });
  if (!user) {
    throw errorBuilder('NotMatch', 403, true);
  }

  const token = await auth.sign(user.dataValues);

  res.json({ token });
};

exports.updatePassword = async (req, res) => {
  const { curPassword, newPassword } = req.body;

  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const curEncrypted = cryptoWrapper.sha256Hex(curPassword);
  const newEncrypted = cryptoWrapper.sha256Hex(newPassword);

  const user = await models.user.findOne({
    where: { uid: req.decoded.uid, password: curEncrypted },
  });
  if (!user) {
    throw errorBuilder('NotMatch', 403, true);
  }

  if (newPassword.length < 8 || newPassword.length > 32) {
    throw errorBuilder('PasswordFormatError', 403, true);
  }

  user.password = newEncrypted;
  await user.save();

  res.json({ success: true });
};

exports.my = async (req, res) => {
  if (!req.hasToken) {
    throw errorBuilder('NotLogin', 401, true);
  }

  const problemsList = await models.problem.findAll({
    attributes: models.projection.problem.list,
    include: [{
      model: models.submit,
      attributes: ['id'],
      where: { user_id: req.decoded.id, solve_flag: 1 },
      as: 'submits',
      required: false
    }, {
      model: models.submit,
      attributes: ['id'],
      where: { user_id: req.decoded.id, pending_flag: 1 },
      as: 'pending_submits',
      required: false
    }],
  });

  const pendingProblemList = await models.problem.findAll({
    attributes: models.projection.problem.list,
    include: [{
      where: {
        user_id: req.decoded.id,
        pending_flag: 1,
      },
      model: models.submit,
      as: 'pending_submits',
      attributes: models.projection.submit.pending,
    }],
  });

  const threadCount = await models.thread.count({
    where: {
      user_id: req.decoded.id,
    }
  });

  const threadStarCount = await models.threadStar.count({
    where: {
      thread_writer_id: req.decoded.id,
    },
  });

  res.json({ problemsList, pendingProblemList, threadCount, threadStarCount });
};

