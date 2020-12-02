const jwt = require("jsonwebtoken");
const { accessTokenSecret, expTime } = require("../../../config/jwt");

module.exports = function () {
  return function (req, res, next) {
    console.log("Authenticate User");
    const user = req.user;

    if (user === undefined || user === null) {
      return res
        .status(400)
        .send("Cannot find or create the user you were trying to.");
    }

    const accessToken = jwt.sign(
      {
        username: user.userName,
        isTeacher: user.isTeacher,
        expirationDate: Date.now() + expTime * 1000,
      },
      accessTokenSecret
    );

    res.retData = {
      token: accessToken,
      tokenExpirationTime: expTime,
    };
    return next();
  };
};
