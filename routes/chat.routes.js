const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

// HALAMAN UI (EJS)
router.get("/", (req, res) => {
  res.render("chat");
});

// API AI
router.post("/", chatController.sendMessage);

module.exports = router;