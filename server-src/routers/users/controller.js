// user controller
const errorBuilder = require('../../modules/error-builder');
const cryptoWrapper = require('../../modules/crypto-wrapper');
const auth = require('../../modules/auth');
const models = require('../../models');
const recaptcha = require('../../modules/recaptcha')

exports.postIndex = async (req, res) => {
  const { uid, password, recaptchaResponse } = req.body;
  const encrypted = cryptoWrapper.sha256Hex(password);

  try {
    await recaptcha(recaptchaResponse);
  } catch (err) {
    throw errorBuilder('recaptchaError', 401, true);
  }

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

exports.ratingList = async (req, res) => {
  const ratingList = await models.sequelize.query(`select @rank := @rank + 1 as rank, p.* from (
select u.id as user_id, u.uid, u.short_message, COALESCE(s.count, 0) as solve_count, COALESCE(p.count, 0)+COALESCE(th.count, 0) as post_count,
COALESCE(th_star.count, 0) as thread_star_count, round(COALESCE(COALESCE(s.count, 0)/COALESCE(s2.count, 0), 0)*100, 2) as solve_ratio
from users u
left join (select user_id, count(*) as count from submits where solve_flag=1 group by user_id) s on u.id = s.user_id
left join (select user_id, count(*) as count from posts group by user_id) p on u.id = p.user_id
left join (select user_id, count(*) as count from threads group by user_id) th on u.id = th.user_id
left join (select thread_writer_id, count(*) as count from thread_star group by thread_writer_id) th_star on u.id = th_star.thread_writer_id
left join (select user_id, count(distinct problem_id) as count from submits group by user_id) s2 on u.id = s2.user_id
order by solve_count desc, post_count desc, thread_star_count desc, solve_ratio desc LIMIT 50) p, (select @rank := 0) r
`, { type: models.sequelize.QueryTypes.SELECT});

  let myRating = null;
  if (req.hasToken) {
    myRating = await models.sequelize.query(`select * from (
select @rank := @rank + 1 as rank, p.* from (
select u.id as user_id, u.uid, u.short_message, COALESCE(s.count, 0) as solve_count, COALESCE(p.count, 0)+COALESCE(th.count, 0) as post_count,
COALESCE(th_star.count, 0) as thread_star_count, round(COALESCE(COALESCE(s.count, 0)/COALESCE(s2.count, 0), 0)*100, 2) as solve_ratio
from users u
left join (select user_id, count(*) as count from submits where solve_flag=1 group by user_id) s on u.id = s.user_id
left join (select user_id, count(*) as count from posts group by user_id) p on u.id = p.user_id
left join (select user_id, count(*) as count from threads group by user_id) th on u.id = th.user_id
left join (select thread_writer_id, count(*) as count from thread_star group by thread_writer_id) th_star on u.id = th_star.thread_writer_id
left join (select user_id, count(distinct problem_id) as count from submits group by user_id) s2 on u.id = s2.user_id
order by solve_count desc, post_count desc, thread_star_count desc, solve_ratio desc) p, (select @rank := 0) r ) t
where t.user_id = ${req.decoded.id};`, { type: models.sequelize.QueryTypes.SELECT});
  }

  res.json({ ratingList, myRating: myRating ? myRating[0] : null });
};
