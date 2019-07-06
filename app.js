const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Record = require("./models/record");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
require("./handlebars-helpers");

const port = 3000;

//mongoose setting
mongoose.connect("mongodb://localhost/record", {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb errors");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

//handlebars setting
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//routers
app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));

app.listen(port, (req, res) => {
  console.log(`The app server is running on :http://localhost:${port}`);
});
