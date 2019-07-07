const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth");

router.get("/new", authenticated, (req, res) => {
  res.render("new");
});

router.post("/new", authenticated, (req, res) => {
  console.log("req.body", req.body);
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    userId: req.user._id
  });
  record.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

router.get("/:id/edit", authenticated, (req, res) => {
  console.log("req.params.id", req.params.id);
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      return res.render("edit", { record });
    }
  );
});

router.put("/:id/edit", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.name = req.body.name;
      record.category = req.body.category;
      record.date = req.body.date;
      record.amount = req.body.amount;

      record.save(err => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.remove(err => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

router.get("/filter", authenticated, (req, res) => {
  console.log(req.query);
  const filterMonth = req.query.month || "";
  const filterCategory = req.query.category || "";
  const filterMonthRegExp = new RegExp("2019-" + filterMonth, "i");
  const filterCategoryRegExp = new RegExp(filterCategory, "i");

  Record.find({
    userId: req.user._id,
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
