import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const routes = Router();

routes.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
