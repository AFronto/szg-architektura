const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Topic = requireOption(objectrepository, "Topic");
  return function (req, res, next) {
    console.log("Create Topic");

    var topic = new Topic({
      name: req.body.name,
      description: req.body.description,
      owner: req.user,
      questions: [],
    });

    topic.save(function (err, successful_topic) {
      if (err) {
        return res.status(400).send("Cannot create topic!");
      }
      res.locals.retData = {
        id: successful_topic.id,
        owner: {
          id: req.user.id,
          email: req.user.email,
          userName: req.user.userName,
          isTeacher: req.user.isTeacher,
        },
      };
      return next();
    });
  };
};
