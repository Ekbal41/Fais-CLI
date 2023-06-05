const exampleApi = async (app) => {
  app.get("/", (req, res) => {
    res.render("./templates/index.html", {
      title: "Fais Demo Website",
      message: "Welcome to Fais Framework",
    });
  });
};
export default exampleApi;
