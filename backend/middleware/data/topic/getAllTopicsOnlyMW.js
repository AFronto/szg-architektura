const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Topic = requireOption(objectrepository, "Topic");
  return function (req, res, next) {
    console.log("Get All Topics");

    Topic.find({})
      .populate({
        path: "owner",
      })
      .populate({
        path: "studentOnTopic",
      })
      .exec(function (err, topics) {
        if (err) return res.status(400).send("Cannot find topics!");

        req.allTopic = topics;
        return next();
      });
  };
};
