const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Record = require("./models/record");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
require("./handlebars-helpers");

const port = 3000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//use connect-flash
app.use(flash());

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
    secret: "i2uih2ibviwbejfbwfuig",
    resave: "false",
    saveUninitialized: "false"
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
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

//routers
app.use("/", require("./routes/home"));
app.use("/records", require("./routes/record"));
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auths"));

app.listen(port, (req, res) => {
  console.log(`The app server is running on :http://localhost:${port}`);
});
