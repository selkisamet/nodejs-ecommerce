exports.getErrorsPage = (req, res) => {
  res.status(404).render("../views/errors/404.pug", { title: "404 Not Found" });
};
