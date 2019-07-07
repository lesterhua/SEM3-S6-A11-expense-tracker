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

router.post("/:id/edit", (req, res) => {
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

router.post("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
