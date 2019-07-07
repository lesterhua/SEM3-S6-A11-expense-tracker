const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth");

router.get("/", authenticated, (req, res) => {
  Record.find({ userId: req.user._id }, (err, record) => {
    if (err) return console.error(err);

    let totalAmount = 0;
    record.filter(({ amount }) => {
      // console.log(amount);
      totalAmount += amount;
    });
    // console.log("total", totalAmount);
    return res.render("index", { record, totalAmount });
  });
});

module.exports = router;
