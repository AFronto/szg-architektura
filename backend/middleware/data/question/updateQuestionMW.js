const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Question = requireOption(objectrepository, "Question");

  return function (req, res, next) {
    console.log("Update Question");

    Question.find({ _id: req.body.id }).exec(function (err_find, questions) {
      if (err_find) {
        return res.status(400).send("Cannot update question!");
      }

      questions[0].text = req.body.text;
      questions[0].isClosed = req.body.isClosed;

      questions[0].save(function (err, successful_question) {
        if (err) {
          return res.status(400).send("Cannot update question!");
        }

        res.locals.retData = {
          id: successful_question.id,
        };
      });

      return next();
    });
  };
};
