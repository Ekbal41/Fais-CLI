export const welcomePage =(req, res) => {
    res.render("./templates/welcome.html", {
        title: "FaisJS",
        message: "Welcome to Fais Framework",
    });
};