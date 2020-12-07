const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    console.log("Update Consultation");
    if (req.topic.consultation.length === 0) {
      return res.status(400).send("Cannot update consultation!");
    }

    var consultation = req.topic.consultation[0];
    consultation.date = new Date(req.body.date);
    consultation.status = req.body.status;
    consultation.lastModified = req.body.lastModified;

    consultation.save(function (err, successful_consultation) {
      if (err) {
        return res.status(400).send("Cannot update consultation!");
      }

      res.locals.retData = {
        id: successful_consultation.id,
      };
      return next();
    });
  };
};
