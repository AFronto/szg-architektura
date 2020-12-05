const Topic = require("./Topic");
const User = require("./User");
const Question = require("./Question");
const Reply = require("./Reply");

const objRepo = {
  User: User,
  Topic: Topic,
  Question: Question,
  Reply: Reply,
};

module.exports = objRepo;
