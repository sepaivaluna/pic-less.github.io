const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.redirect("/user/login");
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/fail-login",
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy((err) => {
    if (err) return res.redirect("/user/login");

    res.redirect("/user/logout");
  });
});

module.exports = router;
