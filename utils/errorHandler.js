module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging

  res.status(err.status || 500).render("error", {
    title: "Error Page",
    message: err.message || "Something went wrong!",
    status: err.status || 500,
  });
};
