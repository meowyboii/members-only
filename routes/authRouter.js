const express = require("express");
const router = express.Router();
const {
  getSignUp,
  createUser,
  validateUser,
} = require("../controllers/authController");

router.get("/sign-up", getSignUp);
router.post("/sign-up", validateUser, createUser);

module.exports = router;
