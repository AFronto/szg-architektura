module.exports = function () {
  return function (req, res, next) {
    console.log("Send back actual Topic");
    res.locals.retData = {
      id: req.topic.id,
      name: req.topic.name,
      description: req.topic.description,
      owner: {
        id: req.topic.owner.id,
        email: req.topic.owner.email,
        userName: req.topic.owner.userName,
        isTeacher: req.topic.owner.isTeacher,
      },
      questions: req.topic.questions.map((q) => {
        return {
          ...q,
          owner: {
            id: q.owner.id,
            email: q.owner.email,
            userName: q.owner.userName,
            isTeacher: q.owner.isTeacher,
          },
          replies: map((r) => {
            return {
              ...r,
              owner: {
                id: r.owner.id,
                email: r.owner.email,
                userName: r.owner.userName,
                isTeacher: r.owner.isTeacher,
              },
            };
          }),
        };
      }),
    };
    return next();
  };
};