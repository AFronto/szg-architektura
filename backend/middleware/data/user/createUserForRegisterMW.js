const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const User = requireOption(objectrepository, "User");
  return function (req, res, next) {
    console.log("Create User for register");
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.userName === "undefined" ||
      typeof req.body.password === "undefined" ||
      typeof req.body.repeatPassword === "undefined" ||
      typeof req.body.isTeacher === "undefined"
    ) {
      return next();
    }

    User.find({ email: req.body.email }, function (err, users) {
      if (err) return next();
      if (users.length > 0) {
        return res.status(400).send("A user with this email already exists!");
      }

      var user = new User({
        email: req.body.email,
        userName: req.body.userName,
        passwordHash: req.body.password,
        isTeacher: req.body.isTeacher,
        salt: req.salt,
      });

      req.user = user;
      return next();
    });
  };
};
