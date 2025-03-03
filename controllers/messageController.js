const { Message } = require("../db/messageQueries");

const createMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const userId = req.user.id;
    const newMessage = await Message.add(title, message, userId);
    if (newMessage) {
      res.status(200).redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

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

module.exports = { createMessage, deleteMessage };
