const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Deadline = requireOption(objectrepository, "Deadline");
  const Topic = requireOption(objectrepository, "Topic");

  return function (req, res, next) {
    console.log("Create Deadline");

    var deadline = new Deadline({
      description: req.body.description,
      date: new Date(req.body.date),
      link: req.body.link,
      isDone: req.body.isDone,
    });

    deadline.save(function (err, successful_deadline) {
      if (err) {
        return res.status(400).send("Cannot create deadline!");
      }

      Topic.find({ _id: req.params.topicId }).exec(function (err_find, topics) {
        if (err_find) {
          return res.status(400).send("Cannot create deadline!");
        }
        topics[0].deadlines.push(successful_deadline);
        topics[0].save(function (err_add, _successful_add) {
          if (err_add) {
            return res.status(400).send("Cannot create deadline!");
          }
          res.locals.retData = {
            id: successful_deadline.id,
          };
          return next();
        });
      });
    });
  };
};
