const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// AUTH ROUTES

// Sign up
router.post(
  "/api/auth/signup",
  authController.validateSignupRules(),
  authController.validateSignup,
  catchErrors(authController.signup)
);
// Sign in
router.post("/api/auth/signin", authController.signin);
// Sign out
router.get("/api/auth/signout", authController.signout);


// EMPLOYEE ROUTES
router.param("userId", catchErrors(userController.getUserById));

router
  .route("/api/users/:userId")
  .get(
    authController.checkAuth,
    userController.getUserProfile
  )
  .put(
    authController.checkAuth,
    catchErrors(userController.updateUser)
  );

module.exports = router;