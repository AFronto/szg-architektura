const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Topic = requireOption(objectrepository, "Topic");
  const Question = requireOption(objectrepository, "Question");
  const Reply = requireOption(objectrepository, "Reply");
  const Deadline = requireOption(objectrepository, "Deadline");

  return function (req, res, next) {
    console.log("Delete Topic");
    if (!req.user.isTeacher || req.user.id !== req.topic.owner.id) {
      return res.status(403).send("You have no access!");
    }

    req.topic.deadlines.forEach((d) => {
      Deadline.deleteOne({ _id: d.id }).exec((err) => {
        if (err !== null) {
          console.log(`Deleting Deadline Error: ${err}`);
        }
      });
    });

    req.topic.questions.forEach((q) => {
      q.replies.forEach((r) => {
        Reply.deleteOne({ _id: r.id }).exec((err) => {
          if (err !== null) {
            console.log(`Deleting Reply Error: ${err}`);
          }
        });
      });

      Question.deleteOne({ _id: q.id }).exec((err) => {
        if (err !== null) {
          console.log(`Deleting Question Error: ${err}`);
        }
      });
    });

    Topic.deleteOne({ _id: req.params.id }).exec((err) => {
      if (err !== null) {
        console.log(`Deleting Topic Error: ${err}`);
      }
      res.locals.retData = res.locals.retData = {
        id: req.params.id,
      };
      return next();
    });
  };
};
