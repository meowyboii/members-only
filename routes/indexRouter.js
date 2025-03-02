const express = require("express");
const { getIndex } = require("../controllers/indexController");
const { authenticate } = require("../controllers/authController");
const router = express.Router();

router.get("/", authenticate, getIndex);

module.exports = router;
