import { Router } from "express";
import playerRoutes from "./playerRoutes";

const routes = Router();
routes.use("/v1/players", playerRoutes);
export default routes;
