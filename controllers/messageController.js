const { Message } = require("../db/messageQueries");

const createMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const newMessage = await Message.add(title, message);
    if (newMessage) {
      res.status(200);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage };
