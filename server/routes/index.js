const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


router.post(
  "/api/auth/signup",
  userController.getUser,
  catchErrors()
);

module.exports = router;