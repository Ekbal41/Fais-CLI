import Fais from "fais";
import exampleApi from "./src/routes/api.js";
const app = new Fais();
const PORT = process.env.PORT || 3000;
//resister all the routes here
exampleApi(app);
//start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : http://localhost:${PORT}`);
});
export default app;
