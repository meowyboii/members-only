const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./utils/passport");
const errorHandler = require("./utils/errorHandler");
const authRouter = require("./routes/authRouter");
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

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

//Current user middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(authRouter);
app.use(indexRouter);
app.use(messageRouter);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
