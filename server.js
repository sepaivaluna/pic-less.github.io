/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

/* Internal Modules */
const { landingRouter, userRouter, commentRouter, postRouter, homeRouter } = require("./routes");

/* Port */
const PORT = 3000;

require("dotenv").config();

/* App instance */
const app = express();

/* Require our mongoDB */
require("./config/database");

require("./config/passport");

/* Views config */
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "YouAreTheOne",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/", landingRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);

/* App listen */
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
