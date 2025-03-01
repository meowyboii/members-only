const { User } = require("../db/authQueries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("../utils/passport");
require("dotenv").config();

const getSignUp = async (req, res, next) => {
  try {
    res.render("sign-up", { errors: null, formData: {} });
  } catch (error) {
    return next(error);
  }
};

const getLogin = async (req, res, next) => {
  try {
    const error = req.session.messages;
    req.session.messages = [];
    res.render("log-in", { error: error });
  } catch (error) {
    return next(error);
  }
};

const getJoinClub = async (req, res, next) => {
  try {
    res.render("join-the-club", { errors: null });
  } catch (error) {
    return next(error);
  }
};

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must only contain letters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must only contain letters"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      errors: errors.array(),
      formData: req.body,
    });
  }
  try {
    const { firstName, lastName, username, password } = req.body;
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.render("sign-up", {
        errors: [{ msg: "Username already taken" }],
        formData: req.body,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = req.body.isAdmin === "true";
    const user = await User.createUser(
      firstName,
      lastName,
      username,
      hashedPassword,
      isAdmin
    );
    if (user) {
      // Automatically log in the user after sign-up
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/join-the-club");
      });
    }
  } catch (error) {
    return next(error);
  }
};

const validatePasscode = [body("passcode").trim().notEmpty()];

const createMember = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("join-the-club", {
      errors: errors.array(),
    });
  }
  try {
    const passcode = req.body.passcode;
    if (passcode !== process.env.SECRET_PASSCODE) {
      return res.render("join-the-club", {
        errors: [{ msg: "Passcode is wrong!" }],
      });
    }
    const userId = req.user.id;
    const member = await User.createMember(userId);
    if (member) {
      res.render("/");
    }
  } catch (error) {
    return next(error);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })(req, res, next); // Call the passport middleware
};

module.exports = {
  getSignUp,
  getLogin,
  getJoinClub,
  createUser,
  createMember,
  login,
  validateUser,
  validatePasscode,
};
