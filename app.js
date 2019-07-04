const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Record = require("./models/record");

const port = 3000;

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

app.get("/", (req, res) => {
  res.send("accounting");
});

app.listen(port, (req, res) => {
  console.log(`The app server is running on :http://localhost:${port}`);
});
