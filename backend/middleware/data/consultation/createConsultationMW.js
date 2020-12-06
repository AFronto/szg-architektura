const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Consultation = requireOption(objectrepository, "Consultation");
  const Question = requireOption(objectrepository, "Question");
  const Topic = requireOption(objectrepository, "Topic");

  return function (req, res, next) {
    console.log("Create Consultation");

    Question.find({}).exec(function (err_question, questions) {
      var consultation = new Consultation({
        date: new Date(req.body.date),
        questions: questions.filter((q) => req.body.questions.includes(q)),
        status: req.body.status,
        lastModified: req.body.lastModified,
      });

      consultation.save(function (err, successful_consultation) {
        if (err) {
          return res.status(400).send("Cannot create consultation!");
        }

        Topic.find({ _id: req.params.topicId }).exec(function (
          err_find,
          topics
        ) {
          if (err_find) {
            return res.status(400).send("Cannot create consultation!");
          }
          topics[0].consultation.push(successful_consultation);
          topics[0].save(function (err_add, _successful_add) {
            if (err_add) {
              return res.status(400).send("Cannot create consultation!");
            }
            res.locals.retData = {
              id: successful_consultation.id,
            };
            return next();
          });
        });
      });
    });
  };
};
