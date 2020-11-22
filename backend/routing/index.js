const sendJsonMW = require("../middleware/sendJsonMW");
const setTestDataMW = require("../middleware/test/setTestDataMW");

module.exports = function (app) {
  app.get(
    "/",
    function (req, res, next) {
      console.log("test get");
    },
    setTestDataMW(),
    sendJsonMW()
  );
};
