module.exports = function () {
  return function (req, res, next) {
    console.log(`\n\n A call came to ${req.path}`);
    return next();
  };
};
