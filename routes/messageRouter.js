const express = require("express");
const {
  createMessage,
  deleteMessage,
  validateMessage,
} = require("../controllers/messageController");
const { authenticate } = require("../controllers/authController");

const router = express.Router();

router.post("/add-message", authenticate, validateMessage, createMessage);
router.post("/delete-message", authenticate, deleteMessage);

module.exports = router;
