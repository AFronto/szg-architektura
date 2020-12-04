const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  const Topic = requireOption(objectrepository, "Topic");
  return function (req, res, next) {
    console.log("Get All Topics");

    Topic.find({})
      .populate({
        path: "owner",
      })
      .exec(function (err, topics) {
        if (err) return res.status(400).send("Cannot find topics!");

        res.locals.retData = topics.map((t) => {
          return {
            id: t.id,
            name: t.name,
            description: t.description,
            owner: {
              id: t.owner.id,
              email: t.owner.email,
              userName: t.owner.userName,
              isTeacher: t.owner.isTeacher,
            },
            questions: [],
          };
        });
        return next();
      });
  };
};
