const express = require("express");
const {
  createMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { authenticate } = require("../controllers/authController");

const router = express.Router();

router.post("/add-message", authenticate, createMessage);
router.post("/delete-message", authenticate, deleteMessage);

module.exports = router;
