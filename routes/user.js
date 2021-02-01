const router = require("express").Router();
const { user } = require("../controllers");

/* http://localhost:3000/user */

router.get("/login", user.showLogin);
router.post("/loginform", user.loginForm);

router.get("/register", user.showRegister);
router.post("/newuser", user.newUserForm);

router.get("/:userId/profile", user.showProfile);

router.get("/logout", user.logout);

module.exports = router;
