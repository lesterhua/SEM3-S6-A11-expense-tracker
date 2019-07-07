const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");
const session = require("express-session");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "email 沒有註冊!" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            done(null, user);
          } else {
            return done(null, false, { message: "密碼有錯!" });
          }
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
