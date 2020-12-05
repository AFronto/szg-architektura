const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Deadline = db.model("Deadline", {
  description: String,
  date: Date,
  link: String,
  isDone: Boolean,
});

module.exports = Deadline;
