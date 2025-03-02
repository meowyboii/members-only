const express = require("express");
const { createMessage } = require("../controllers/messageController");
const { authenticate } = require("../controllers/authController");

const router = express.Router();

router.post("/add-message", authenticate, createMessage);

module.exports = router;
