const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ConsultationApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
