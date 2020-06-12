const protected = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("user must be logged in ");
};

module.exports = protected;
