const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Reply = requireOption(objectrepository, "Reply");
  const Question = requireOption(objectrepository, "Question");

  return function (req, res, next) {
    console.log("Create Reply");

    var reply = new Reply({
      text: req.body.text,
      owner: req.user,
      creationDate: Date.now(),
    });

    reply.save(function (err, successful_reply) {
      if (err) {
        return res.status(400).send("Cannot create reply!");
      }

      Question.find({ _id: req.params.questionId }).exec(function (
        err_find,
        questions
      ) {
        if (err_find) {
          return res.status(400).send("Cannot create reply!");
        }
        questions[0].replies.push(successful_reply);
        questions[0].save(function (err_add, _successful_add) {
          if (err_add) {
            return res.status(400).send("Cannot create reply!");
          }
          res.locals.retData = {
            id: successful_reply.id,
            owner: {
              id: req.user.id,
              email: req.user.email,
              userName: req.user.userName,
              isTeacher: req.user.isTeacher,
            },
            creationDate: successful_reply.creationDate.toString(),
          };
          return next();
        });
      });
    });
  };
};
