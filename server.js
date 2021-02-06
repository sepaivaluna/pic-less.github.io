/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const logger = require("./middleware/index");

/* Internal Modules */
const { landingRouter, userRouter, commentRouter, postRouter, homeRouter } = require("./routes");

/* Port */
require("dotenv").config();
const PORT = process.env.PORT || 3000;

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
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 24 * 7 * 2,
    },
  })
);

app.use(logger);

app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/", landingRouter);
app.use("/", commentRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use("/", postRouter);

/* App listen */
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
