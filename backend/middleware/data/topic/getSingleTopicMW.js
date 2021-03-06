const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Topic = requireOption(objectrepository, "Topic");

  return function (req, res, next) {
    console.log("Get Topic");

    Topic.find({ _id: req.params.topicId })
      .populate({
        path: "owner",
      })
      .populate({
        path: "questions",
      })
      .populate({
        path: "deadlines",
      })
      .populate({
        path: "studentOnTopic",
      })
      .populate({
        path: "consultation",
      })
      .populate({
        path: "consultation",
        populate: {
          path: "questions",
        },
      })
      .populate({
        path: "consultation",
        populate: {
          path: "questions",
          populate: {
            path: "owner",
          },
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "replies",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "owner",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "replies",
          populate: {
            path: "owner",
          },
        },
      })
      .exec(function (err, topics) {
        if (err) {
          return res.status(400).send("Cannot find topic!");
        }

        req.topic = topics[0];
        return next();
      });
  };
};
