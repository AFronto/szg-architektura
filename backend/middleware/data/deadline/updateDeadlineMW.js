const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Deadline = requireOption(objectrepository, "Deadline");

  return function (req, res, next) {
    console.log("Update Deadline");

    Deadline.find({ _id: req.body.id }).exec(function (err_find, deadlines) {
      if (err_find) {
        return res.status(400).send("Cannot update deadline!");
      }
      deadlines[0].description = req.body.description;
      deadlines[0].date = req.body.date;
      deadlines[0].link = req.body.link;
      deadlines[0].isDone = req.body.isDone;

      deadlines[0].save(function (err, successful_deadline) {
        if (err) {
          return res.status(400).send("Cannot update deadline!");
        }

        res.locals.retData = {
          id: successful_deadline.id,
        };
      });

      return next();
    });
  };
};
