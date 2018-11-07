const request = require('request');
const config = require('../config');

module.exports = async (recaptchaResponse) => {
  if (!recaptchaResponse) {
    throw new Error();
  }

  const reqUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaKey}&response=${recaptchaResponse}`;

  request(reqUrl, (err, res, body) => {
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success && !parsedBody.success) {
      throw new Error();
    }
    return 0;
  });
};
