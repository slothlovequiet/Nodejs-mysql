const express = require("express");
const app = express();
const passport = require("passport");
const port = process.env.PORT || 8888;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require("./middleware/passport")(passport);

const routes = require("./settings/route");
routes(app);

app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
