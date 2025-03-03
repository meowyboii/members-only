const { Message } = require("../db/messageQueries");

const createMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const userId = req.user.id;
    const newMessage = await Message.add(title, message, userId);
    if (newMessage) {
      console.log(newMessage);
      res.status(200).redirect("/");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMessage };
