const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const { body, sanitizeBody, check, validationResult } = require("express-validator");

exports.validateSignupRules = () => {
  return [
    check("email", "Enter a valid email").isEmail().normalizeEmail(),
    check("password", "Enter a Password").notEmpty(),
    check("password", "Password must be atleast 6 characters long").isLength({ min: 6 })
  ];
};

exports.validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const firstError = errors.errors.map(error => error.msg)[0];
  return res.status(400).send({ messgage: firstError });
};

exports.signup = async (req, res, next) => {
  const { name, email, password, admin = false } = req.body;
  const user = await new User({ name, email, password, admin });
  await user.save();
  res.status(201).send(user);
};

exports.signin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(user);
    });
  })(req, res, next);
};

exports.signout = async (req, res) => {
  res.clearCookie("employee-feedback.sid");
  req.logout();
  res.json({ message: "You are now signed out" });
};

exports.checkAuth = (req, res, next) => {
  if (!req.user || (!req.user.admin && !req.isAuthUser)) {
    return res.status(401).send({ message: "You are not authorized to perform this action" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(401).send({ message: "You are not authorized to perform this action" });
  }
  next();
};