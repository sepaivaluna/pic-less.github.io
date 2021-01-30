/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

/* Internal Modules */
const { landingRouter, userRouter, commentRouter, postRouter } = require("./routes");

/* Port */
const PORT = 3000;

/* Require our mongoDB */
require("./config/database");

require("./config/passport");

require("dotenv").config();

/* App instance */
const app = express();

/* Views config */
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "YouAreTheOne",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));

app.use(express.static("public"));

/* Routes */
app.use("/", landingRouter);

/* App listen */
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
