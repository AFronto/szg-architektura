var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

// Load routing
require("./routing/index")(app);

var server = app.listen(5000, function () {
  console.log("Running on :5000");
});
