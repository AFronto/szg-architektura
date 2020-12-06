module.exports = function () {
  return function (req, res, next) {
    console.log("Check Student access");
    if (req.user.isTeacher) {
      return res.status(403).send("You have no access to do this!");
    }
    return next();
  };
};
