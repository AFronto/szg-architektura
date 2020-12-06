const Topic = require("./Topic");
const User = require("./User");
const Question = require("./Question");
const Reply = require("./Reply");
const Deadline = require("./Deadline");

const objRepo = {
  User: User,
  Topic: Topic,
  Question: Question,
  Reply: Reply,
  Deadline: Deadline,
};

module.exports = objRepo;
