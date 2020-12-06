const requireOption = require("../../../config/requireOption");

module.exports = function (objectrepository) {
  return function (req, res, next) {
    console.log("Set Application for Topic");

    var usersCurrentTopicIndex = req.allTopic.findIndex(
      (topic) =>
        topic.studentOnTopic.length > 0 &&
        topic.studentOnTopic[0].id === req.user.id
    );

    var topicToApplyForindex = req.allTopic.findIndex(
      (topic) => topic.id === req.params.topicId
    );

    if (usersCurrentTopicIndex !== -1) {
      req.allTopic[usersCurrentTopicIndex].studentOnTopic.splice(0, 1);
      req.allTopic[usersCurrentTopicIndex].save();
    }
    if (
      topicToApplyForindex !== -1 &&
      req.allTopic[topicToApplyForindex].studentOnTopic.length === 0
    ) {
      req.allTopic[topicToApplyForindex].studentOnTopic.push(req.user);
      req.allTopic[topicToApplyForindex].save();
    }

    return next();
  };
};
