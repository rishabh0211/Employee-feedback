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

router.get("/api/users/getAll", authController.isAdmin, catchErrors(userController.getAllUsers));
router
  .route("/api/users/:userId")
  .get(
    authController.isAdmin,
    userController.getUserProfile
  )
  .put(
    authController.checkAuth,
    catchErrors(userController.updateUser)
  )
  .delete(
    authController.checkAuth,
    catchErrors(userController.deleteProfile)
  );

// FEEDBACK ROUTES
router.post("/api/feedback/addUser", authController.isAdmin, catchErrors(userController.addUserToReview));

router.get("/api/feedback/:feedbackId", authController.checkAuth, catchErrors(userController.getFeedback));
router.delete("/api/feedback/:feedbackId", authController.isAdmin, catchErrors(userController.deleteFeedback));
router.post("/api/feedback/:feedbackId", authController.isAdmin, catchErrors(userController.editFeedback));

router.post(
  "/api/feedback",
  catchErrors(userController.addFeedback)
);


module.exports = router;