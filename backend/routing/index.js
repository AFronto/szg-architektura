const createUserForRegisterMW = require("../middleware/data/user/createUserForRegisterMW");
const getUserMW = require("../middleware/data/user/getUserMW");
const logUserInMW = require("../middleware/data/user/logUserInMW");
const authenticateUserMW = require("../middleware/logic/auth/authenticateUserMW");
const passwordHasherMW = require("../middleware/logic/auth/passwordHasherMW");
const validatePasswordMW = require("../middleware/logic/auth/validatePasswordMW");
const sendJsonMW = require("../middleware/logic/sendJsonMW");
const objRepo = require("../models/objecRepository");

module.exports = function (app) {
  app.post(
    "/register",
    passwordHasherMW(),
    createUserForRegisterMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonMW()
  );

  app.post(
    "/login",
    getUserMW(objRepo),
    passwordHasherMW(),
    validatePasswordMW(),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonMW()
  );
};
