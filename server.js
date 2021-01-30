/* External Modules */
const express = require("express");
const methodOverride = require("method-override");

/* Internal Modules */

/* Port */
const PORT = 3000;

/* Require our mongoDB */
require("./config/database");

/* App instance */
const app = express();

/* Views config */
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

/* Routes */
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

/* App listen */
app.listen(PORT, () => console.log(`listening at port ${PORT} \nhttp://localhost:${PORT}`));
