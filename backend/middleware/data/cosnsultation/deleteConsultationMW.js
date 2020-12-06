const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Consultation = requireOption(objectrepository, "Consultation");

  return function (req, res, next) {
    console.log("Delete Consultation");

    var consultation = req.topic.consultation;

    Consultation.deleteOne({ _id: consultation.id }).exec((err) => {
      if (err !== null) {
        return res.status(400).send("Cannot delete consultation!");
      }

      res.locals.retData = {
        id: consultation.id,
      };
      return next();
    });
  };
};
