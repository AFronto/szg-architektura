const createUserForRegisterMW = require("../middleware/data/user/createUserForRegisterMW");
const getUserForLoginMW = require("../middleware/data/user/getUserForLoginMW");
const getUserMW = require("../middleware/data/user/getUserMW");
const logUserInMW = require("../middleware/data/user/logUserInMW");
const logUserOutMW = require("../middleware/data/user/logUserOutMW");
const authenticateUserMW = require("../middleware/logic/auth/authenticateUserMW");
const authenticateWithJWTMW = require("../middleware/logic/auth/authenticateWithJWTMW");
const passwordHasherMW = require("../middleware/logic/auth/passwordHasherMW");
const validatePasswordMW = require("../middleware/logic/auth/validatePasswordMW");
const logIncomingCallMW = require("../middleware/logic/log/logIncomingCallMW");
const sendJsonMW = require("../middleware/logic/sendJsonMW");
const objRepo = require("../models/objecRepository");

module.exports = function (app) {
  app.post(
    "/register",
    logIncomingCallMW(),
    passwordHasherMW(),
    createUserForRegisterMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonMW()
  );

  app.post(
    "/login",
    logIncomingCallMW(),
    getUserForLoginMW(objRepo),
    passwordHasherMW(),
    validatePasswordMW(),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonMW()
  );

  app.post(
    "/token",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    authenticateUserMW(),
    logUserInMW(),
    sendJsonMW()
  );

  app.post(
    "/logout",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    logUserOutMW(),
    sendJsonMW()
  );

  app.get(
    "/force-logout",
    logIncomingCallMW(),
    getUserMW(objRepo),
    logUserOutMW(),
    sendJsonMW()
  );
};
