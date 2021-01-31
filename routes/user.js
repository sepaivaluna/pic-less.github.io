const router = require("express").Router();
const { user } = require("../controllers");

router.get("/login", user.login);
router.get("/profile", user.profile);

module.exports = router;
