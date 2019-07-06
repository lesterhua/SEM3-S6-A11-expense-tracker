const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  Record.find((err, record) => {
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
