const express = require("express");
const router = express.Router();

const {
  getSignUp,
  getJoinClub,
  createUser,
  createMember,
  validateUser,
  validatePasscode,
} = require("../controllers/authController");

router.get("/sign-up", getSignUp);
router.post("/sign-up", validateUser, createUser);
router.get("/join-the-club", getJoinClub);
router.post("/join-the-club/:id", validatePasscode, createMember);

module.exports = router;
