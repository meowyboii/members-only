const { Message } = require("../db/messageQueries");

const createMessage = (req, res, next) => {
  try {
    const { title, message } = req.body;
    const newMessage = Message.add(title, message);
    if (newMessage) {
      res.status(200);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage };
