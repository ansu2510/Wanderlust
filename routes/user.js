const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  renderSignupPage,
  SignUp,
  renderLoginPage,
  login,
  logout,
} = require("../controllers/user.js");

router.route("/signup").get(renderSignupPage).post(wrapAsync(SignUp));

router
  .route("/login")
  .get(renderLoginPage)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

router.get("/logout", logout);

module.exports = router;
