const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./utils/passport");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

//Passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
