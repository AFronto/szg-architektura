const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Question = requireOption(objectrepository, "Question");
  const Topic = requireOption(objectrepository, "Topic");

  return function (req, res, next) {
    console.log("Create Question");

    var question = new Question({
      text: req.body.text,
      owner: req.user,
      replies: [],
      creationDate: Date.now(),
      isPrivate: req.body.isPrivate,
      isClosed: false,
    });

    question.save(function (err, successful_question) {
      if (err) {
        return res.status(400).send("Cannot create question!");
      }

      Topic.find({ _id: req.params.topicId }).exec(function (err_find, topics) {
        if (err_find) {
          return res.status(400).send("Cannot create question!");
        }
        topics[0].questions.push(successful_question);
        topics[0].save(function (err_add, _successful_add) {
          if (err_add) {
            return res.status(400).send("Cannot create question!");
          }
          res.locals.retData = {
            id: successful_question.id,
            owner: {
              id: req.user.id,
              email: req.user.email,
              userName: req.user.userName,
              isTeacher: req.user.isTeacher,
            },
            creationDate: successful_question.creationDate.toString(),
          };
          return next();
        });
      });
    });
  };
};
