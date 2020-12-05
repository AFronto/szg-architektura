const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Question = db.model("Question", {
  text: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  creationDate: Date,
  isPrivate: Boolean,
});

module.exports = Question;
