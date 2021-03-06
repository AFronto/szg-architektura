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
      deadlines: req.topic.deadlines.map((d) => {
        return {
          id: d.id,
          description: d.description,
          date: d.date.toString(),
          link: d.link,
          isDone: d.isDone,
        };
      }),
      studentOnTopic: req.topic.studentOnTopic.map((sOT) => {
        return {
          id: sOT.id,
          email: sOT.email,
          userName: sOT.userName,
          isTeacher: sOT.isTeacher,
        };
      }),
      consultation: req.topic.consultation.map((c) => {
        return {
          id: c.id,
          date: c.date.toString(),
          questions: c.questions.map((q) => {
            return {
              id: q.id,
              text: q.text,
              creationDate: q.creationDate.toString(),
              isPrivate: q.isPrivate,
              isClosed: q.isClosed,
              owner: {
                id: q.owner.id,
                email: q.owner.email,
                userName: q.owner.userName,
                isTeacher: q.owner.isTeacher,
              },
              replies: [],
            };
          }),
          status: c.status,
          lastModified: c.lastModified,
        };
      }),
      questions: req.topic.questions.map((q) => {
        return {
          id: q.id,
          text: q.text,
          creationDate: q.creationDate.toString(),
          isPrivate: q.isPrivate,
          isClosed: q.isClosed,
          owner: {
            id: q.owner.id,
            email: q.owner.email,
            userName: q.owner.userName,
            isTeacher: q.owner.isTeacher,
          },
          replies: q.replies.map((r) => {
            return {
              id: r.id,
              creationDate: r.creationDate.toString(),
              text: r.text,
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
