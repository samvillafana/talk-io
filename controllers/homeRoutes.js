const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render("home");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("login");
});

module.exports = router;
