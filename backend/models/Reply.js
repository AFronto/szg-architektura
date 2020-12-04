const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Reply = db.model("Reply", {
  text: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  creationDate: Date,
});

module.exports = Reply;
