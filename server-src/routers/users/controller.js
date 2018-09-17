// user controller
const errorBuilder = require('../../modules/error-builder');
const cryptoWrapper = require('../../modules/crypto-wrapper');
const auth = require('../../modules/auth');
const models = require('../../models');

exports.postIndex = async (req, res) => {
  const { uid, password } = req.body;
  const encrypted = cryptoWrapper.sha256Hex(password);

  const users = await models.user.findAll({ where: { uid } });
  if (users.length > 0) {
    throw errorBuilder('IDExists', 409, true);
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

