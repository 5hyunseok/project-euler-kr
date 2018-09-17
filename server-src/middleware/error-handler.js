const models = require('../models');

module.exports = (err, req, res, next) => {
  res.status(err.status || 500);

  if (!err.notDisplay) {
    console.log(err);
    models.errorLog.create({
      status: err.status || 500,
      code: err.code,
      message: err.message,
      stack: err.stack,
      errno: err.errno,
      syscall: err.syscall,
      path: err.path,
      address: err.address,
      request_url: req.originalUrl,
      client_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });
  }

  if (!err.notSend) {
    res.json({
      error: true,
      status: err.status || 500,
      message: err.message,
    });
  }
};
