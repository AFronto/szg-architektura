const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Topic = db.model("Topic", {
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

module.exports = Topic;
