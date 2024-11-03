import { Router } from "express"
import playerRoutes from "./playerRoutes"

const route = Router();
route.use("/players",  playerRoutes);
export default route;