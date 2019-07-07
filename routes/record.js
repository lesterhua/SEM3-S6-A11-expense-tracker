const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res) => {
  console.log("req.body", req.body);
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  });
  record.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

router.get("/:id/edit", (req, res) => {
  console.log("req.params.id", req.params.id);
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    return res.render("edit", { record });
  });
});

router.put("/:id/edit", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.name = req.body.name;
    record.category = req.body.category;
    record.date = req.body.date;
    record.amount = req.body.amount;

    record.save(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

router.delete("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

router.get("/filter", (req, res) => {
  console.log(req.query);
  const filterMonth = req.query.month || "";
  const filterCategory = req.query.category || "";
  const filterMonthRegExp = new RegExp("2019-" + filterMonth, "i");
  const filterCategoryRegExp = new RegExp(filterCategory, "i");

  Record.find({
    date: {
      $regex: filterMonthRegExp
    },
    category: {
      $regex: filterCategoryRegExp
    }
  }).exec((err, record) => {
    if (err) return console.error(err);

    let totalAmount = 0;
    record.filter(({ amount }) => {
      totalAmount += amount;
    });

    console.log(record);
    return res.render("index", {
      record,
      totalAmount,
      filterMonth,
      filterCategory
    });
  });
});

module.exports = router;
