import { Router } from "express";
import playerRoutes from "./playerRoutes";
import swaggerRoutes from "./swagger";

const routes = Router();
routes.use("/v1/players", playerRoutes);
routes.use("/", swaggerRoutes);
export default routes;
