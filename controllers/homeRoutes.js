const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render("home");
});

router.get("/chat/:id", withAuth, async (req, res) => {
  try {
    const postData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = userData.get({
      plain: true,
    });

    res.render("chat", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/chat");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/chat");
    return;
  }
  res.render("signup");
});

module.exports = router;
