const createConsultationMW = require("../middleware/data/cosnsultation/createConsultationMW");
const deleteConsultationMW = require("../middleware/data/cosnsultation/deleteConsultationMW");
const updateConsultationMW = require("../middleware/data/cosnsultation/updateConsultationMW");
const createDeadlineMW = require("../middleware/data/deadline/createDeadlineMW");
const updateDeadlineMW = require("../middleware/data/deadline/updateDeadlineMW");
const createQuestionMW = require("../middleware/data/question/createQuestionMW");
const updateQuestionMW = require("../middleware/data/question/updateQuestionMW");
const createReplyMW = require("../middleware/data/reply/createReplyMW");
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

  app.post(
    "/topics/:topicId/question",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createQuestionMW(objRepo),
    sendJsonMW()
  );

  app.post(
    "/topics/:topicId/question/:questionId/reply",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createReplyMW(objRepo),
    sendJsonMW()
  );

  app.post(
    "/topics/:topicId/deadline",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createDeadlineMW(objRepo),
    sendJsonMW()
  );

  app.put(
    "/topics/:topicId/question",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    updateQuestionMW(objRepo),
    sendJsonMW()
  );

  app.put(
    "/topics/:topicId/deadline",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    updateDeadlineMW(objRepo),
    sendJsonMW()
  );

  app.post(
    "/topics/:topicId/consultation",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    createConsultationMW(objRepo),
    sendJsonMW()
  );

  app.put(
    "/topics/:topicId/consultation/:consultationId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getSingleTopicMW(objRepo),
    updateConsultationMW(objRepo),
    sendJsonMW()
  );

  app.delete(
    "/topics/:topicId/consultation/:consultationId",
    logIncomingCallMW(),
    authenticateWithJWTMW(),
    getUserMW(objRepo),
    getSingleTopicMW(objRepo),
    deleteConsultationMW(objRepo),
    sendJsonMW()
  );
};
