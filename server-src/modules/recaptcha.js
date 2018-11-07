const request = require('request-promise-native');
const config = require('../config');

module.exports = async (recaptchaResponse) => {
  if (!recaptchaResponse) {
    throw new Error();
  }

  const parsedBody = await request({
    method: 'POST',
    uri: `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptchaKey}&response=${recaptchaResponse}`,
    json: true,
  });

  if (!parsedBody.success && !parsedBody.success) {
    throw new Error();
  }
};
