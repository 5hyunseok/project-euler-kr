module.exports = (message, status, notDisplay = false, notSend = false) => {
  const err = new Error(message);
  err.status = status;
  err.notDisplay = notDisplay;
  err.notSend = notSend;

  return err;
};
