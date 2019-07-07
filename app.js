const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Record = require("./models/record");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
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

//method-override
app.use(methodOverride("_method"));

//define session
app.use(
  session({
    secret: "i2uih2ibviwbejfbwfuig"
  })
);

//initialize passport
app.use(passport.initialize());

//use passport session
app.use(passport.session());

//require passport.js
require("./config/passport")(passport);

//get data from the view
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

//routers
app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));
app.use("/users", require("./routes/user"));

app.listen(port, (req, res) => {
  console.log(`The app server is running on :http://localhost:${port}`);
});
