const db = require("../config/db");

const User = db.model("User", {
  email: String,
  userName: String,
  passwordHash: String,
  isTeacher: Boolean,
  isLogedIn: Boolean,
  salt: String,
});

module.exports = User;
