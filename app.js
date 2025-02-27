const path = require("node:path");
const express = require("express");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
