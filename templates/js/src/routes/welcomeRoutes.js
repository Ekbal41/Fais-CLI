import { welcomePage } from "../controllers/welcomeController.js";

const welcomeRoutes = async (app) => {
  app.get("/", welcomePage);
};
export default welcomeRoutes;
