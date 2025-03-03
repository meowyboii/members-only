const { Message } = require("../db/messageQueries");
const getIndex = async (req, res, next) => {
  try {
    const messages = await Message.getAll();
    res.render("index", { messages: messages, errors: null });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getIndex };
