const express = require("express");
const { createMessage } = require("../controllers/messageController");

const router = express.Router();

router.post("/add-message", createMessage);

module.exports = router;
