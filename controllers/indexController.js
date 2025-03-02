const getIndex = async (req, res, next) => {
  try {
    res.render("index");
  } catch (error) {
    return next(error);
  }
};

module.exports = { getIndex };
