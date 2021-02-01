const router = require("express").Router();
const { home } = require("../controllers");

router.get("/", home.show);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/auth/google");
// }

module.exports = router;
