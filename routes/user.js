const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res) => {
  res.send("login action");
});

router.post("/register", (req, res) => {
  res.send("register action");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
