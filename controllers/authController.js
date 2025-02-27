const { User } = require("../db/authQueries");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const getSignUp = async (req, res, next) => {
  try {
    res.render("sign-up", { errors: null, formData: {} });
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser(
      firstName,
      lastName,
      username,
      hashedPassword
    );
    if (user) {
      res.redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { getSignUp, createUser, validateUser };
