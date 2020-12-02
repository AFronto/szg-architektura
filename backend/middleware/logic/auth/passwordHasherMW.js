const crypto = require("crypto");

module.exports = function () {
  return function (req, res, next) {
    console.log("Hash password");
    if (typeof req.body.password === "undefined") {
      return next();
    }
    let rounds = 12;
    let salt =
      req.salt ||
      crypto
        .randomBytes(Math.ceil(rounds / 2))
        .toString("hex")
        .slice(0, rounds);
    let hash = crypto.createHmac("sha512", salt);
    hash.update(req.body.password);
    req.body.password = hash.digest("hex");
    req.salt = salt;
    return next();
  };
};
