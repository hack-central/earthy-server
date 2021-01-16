module.exports = (req, res, next) => {
  res.header("X-CrossToken", "fspdmcosncabbsfwaincc");
  next();
};
