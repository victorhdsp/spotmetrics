import dotenv from "dotenv";
import express from "express";
import { innitialize } from "../prisma/database";
import errorMiddleware from "./middleware/error";
import routes from "./routes";
import { startSwagger } from "./swagger";

dotenv.config();

const PORT = 3000;

innitialize().then(() => {
    const app = express();
    app.use(express.json());
    startSwagger(app, PORT);
    app.use(routes);
    app.use(errorMiddleware);
    return app.listen(PORT, () => `server running on port ${PORT}`);
})



