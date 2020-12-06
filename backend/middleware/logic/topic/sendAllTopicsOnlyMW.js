module.exports = function () {
  return function (req, res, next) {
    console.log("Send All Topics");

    res.locals.retData = req.allTopic.map((t) => {
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
        studentOnTopic: t.studentOnTopic.map((sOT) => {
          return {
            id: sOT.id,
            email: sOT.email,
            userName: sOT.userName,
            isTeacher: sOT.isTeacher,
          };
        }),
        questions: [],
        deadlines: [],
        consultation: [],
      };
    });

    return next();
  };
};
