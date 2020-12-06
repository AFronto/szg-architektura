const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Consultation = db.model("Consultation", {
  date: Date,
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  status: String,
  lastModified: String,
});

module.exports = Consultation;
