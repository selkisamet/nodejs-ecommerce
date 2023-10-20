"use strict";

var express = require("express");

var app = express();

var bodyParser = require("body-parser");

var path = require("path");

var adminRoutes = require("./routes/admin");

var userRoutes = require("./routes/user");

app.set("view engine", "pug");
app.set("views", "./views", {
  pretty: true
}); // Body Parsing

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "./public/"))); // Routes

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use(function (req, res) {
  res.status(404).render("404");
});
app.listen(3000, function () {
  console.log("Listening on port 3000..");
});