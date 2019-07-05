const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.send("new page");
});

router.post("/new", (req, res) => {
  res.send("new action");
});

router.get("/:id/edit", (req, res) => {
  res.send("edit page");
});

router.post("/:id/edit", (req, res) => {
  res.send("edit action");
});

router.post("/:id/delete", (req, res) => {
  res.send("delete action");
});

module.exports = router;
