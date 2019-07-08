const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  let errors = [];
  //將passport的message放到errors裡
  errors.push({ message: req.flash("error")[0] });
  //errors裡的message等空的
  if (errors[0].message === undefined) {
    //到登入頁
    res.render("login");
  } else {
    //如果是不空的，到登入頁，將errors的訊息到入
    res.render("login", { errors });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
    badRequestMessage: "Email 和 Password 都為必填欄位!"
  })(req, res, next);
});

router.post("/register", (req, res) => {
  //const name = req.body.name .....
  const { name, email, password, password2 } = req.body;

  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ message: "所有欄位都是必填" });
  }

  if (password != password2) {
    errors.push({ message: "密碼輸入錯誤" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        req.flash("warning_msg", "email己經註冊過了!");
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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出");
  res.redirect("/users/login");
});

module.exports = router;
