const { Message } = require("../db/messageQueries");
const { body, validationResult } = require("express-validator");

const createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = await Message.getAll();
    return res
      .status(400)
      .render("index", { messages: messages, errors: errors.array() });
  }
  try {
    const { title, message } = req.body;
    const userId = req.user.id;
    const newMessage = await Message.add(title, message, userId);
    if (newMessage) {
      res.redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

const validateMessage = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("message").trim().notEmpty().withMessage("Message is required"),
];

const deleteMessage = async (req, res, next) => {
  try {
    const admin = req.user.admin;
    if (!admin) {
      throw new Error("Only an admin can delete messages");
    }
    const { messageId } = req.body;
    const deletedMessage = await Message.delete(messageId);
    if (deletedMessage) {
      res.redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage, deleteMessage, validateMessage };
