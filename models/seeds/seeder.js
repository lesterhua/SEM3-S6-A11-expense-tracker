const mongoose = require("mongoose");
const Record = require("../record");
const bcrypt = require("bcryptjs");
const spentList = require("../../spentList.json").results;
const userList = require("../../users.json").results;
const User = require("../user");

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

  userList.forEach((item, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(item.password, salt, (err, hash) => {
        const newUser = new User({
          name: item.name,
          email: item.email,
          password: hash
        });
        newUser
          .save()
          .then(user => {
            for (let i = index * 5; i < (index + 1) * 5; i++) {
              Record.create({
                name: spentList[i].name,
                category: spentList[i].category,
                date: spentList[i].date,
                amount: spentList[i].amount,
                userId: user._id
              });
            }
          })
          .catch(err => console.log(err));
      });
    });
  });
  console.log("done");
});
