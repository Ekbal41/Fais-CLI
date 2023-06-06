import Fais from "fais";
import welcomeRoutes from "./src/routes/welcomeRoutes.js";
const app = new Fais();
const PORT = process.env.PORT || 8000;
app.assets("/public");
//resister all the routes here
welcomeRoutes(app);
//start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
});

export default app;
