const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })(req, res, next);
});

router.post("/register", (req, res) => {
  //const name = req.body.name .....
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then(user => {
    if (user) {
      console.log("user is already exist!");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      newUser
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
    }
  });
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

module.exports = router;
