const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const {
  getSignUp,
  getJoinClub,
  createUser,
  createMember,
  validateUser,
} = require("../controllers/authController");

router.get("/sign-up", getSignUp);
router.post("/sign-up", validateUser, createUser);
router.get("/join-the-club", getJoinClub);
router.post("/join-the-club/:id", createMember);

module.exports = router;
