const createTopicMW = require("../middleware/data/topic/createTopicMW");
const deleteTopicMW = require("../middleware/data/topic/deleteTopicMW");
const getAllTopicsOnlyMW = require("../middleware/data/topic/getAllTopicsOnlyMW");
const getSingleTopicMW = require("../middleware/data/topic/getSingleTopicMW");
const createUserForRegisterMW = require("../middleware/data/user/createUserForRegisterMW");
const getUserForLoginMW = require("../middleware/data/user/getUserForLoginMW");
const getUserMW = require("../middleware/data/user/getUserMW");
const logUserInMW = require("../middleware/data/user/logUserInMW");
const logUserOutMW = require("../middleware/data/user/logUserOutMW");
const authenticateUserMW = require("../middleware/logic/auth/authenticateUserMW");
const authenticateWithJWTMW = require("../middleware/logic/auth/authenticateWithJWTMW");
const onlyTeacherMW = require("../middleware/logic/auth/onlyTeacherMW");
const passwordHasherMW = require("../middleware/logic/auth/passwordHasherMW");
const sendBackActualUserMW = require("../middleware/logic/auth/sendBackActualUserMW");
const validatePasswordMW = require("../middleware/logic/auth/validatePasswordMW");
const logIncomingCallMW = require("../middleware/logic/log/logIncomingCallMW");
const sendJsonMW = require("../middleware/logic/sendJsonMW");
const sendSingleTopicDataMW = require("../middleware/logic/topic/sendSingleTopicDataMW");
const objRepo = require("../models/objecRepository");

module.exports = function (app) {
  //Authentication
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

  app.get(
    "/user",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    sendBackActualUserMW(),
    sendJsonMW()
  );

  //Topic
  app.get(
    "/topics",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getAllTopicsOnlyMW(objRepo),
    sendJsonMW()
  );

  app.post(
    "/topics",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    onlyTeacherMW(),
    createTopicMW(objRepo),
    sendJsonMW()
  );

  app.delete(
    "/topics/:id",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getSingleTopicMW(objRepo),
    deleteTopicMW(objRepo),
    sendJsonMW()
  );

  app.get(
    "/topics/:id",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getSingleTopicMW(objRepo),
    sendSingleTopicDataMW(),
    sendJsonMW()
  );
};
