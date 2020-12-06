const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Consultation = requireOption(objectrepository, "Consultation");

  return function (req, res, next) {
    console.log("Delete Consultation");

    var consultation = req.topic.consultation[0];

    Consultation.deleteOne({ _id: consultation.id }).exec((err) => {
      if (err !== null) {
        return res.status(400).send("Cannot delete consultation!");
      }
      req.topic.consultation.splice(0, 1);
      req.topic.save(function (err_remove, _successful_remove) {
        if (err_remove) {
          return res.status(400).send("Cannot delete consultation!");
        }
        res.locals.retData = {
          id: consultation.id,
        };
        return next();
      });
    });
  };
};
