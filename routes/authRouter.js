const express = require("express");
const router = express.Router();

const {
  getSignUp,
  getJoinClub,
  createUser,
  createMember,
  validateUser,
  validatePasscode,
  login,
  getLogin,
} = require("../controllers/authController");
const { authenticate } = require("passport");

router.get("/sign-up", getSignUp);
router.post("/sign-up", validateUser, createUser);
router.get("/log-in", getLogin);
router.post("/log-in", login);
router.get("/join-the-club", authenticate, getJoinClub);
router.post("/join-the-club", authenticate, validatePasscode, createMember);

module.exports = router;
