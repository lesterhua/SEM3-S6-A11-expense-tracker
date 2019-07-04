const mongoose = require("mongoose");
const Record = require("../record");
const spentList = require("../../spentList.json").results;

mongoose.connect("mongodb://localhost/record", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  console.log("mongodb connected!");

  spentList.forEach((item, index) => {
    Record.create({
      name: item.name,
      category: item.category,
      date: item.date,
      amount: item.amount
    });
  });
  console.log("done");
});
