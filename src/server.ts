import "../prisma/database";
import dotenv from "dotenv";
import { startSwagger } from "./swagger";
import express from "express";
import route from "./routes";

dotenv.config();

const PORT = 3000;

const app = express();


app.use(express.json());
startSwagger(app, PORT);

app.use(route);
app.listen(PORT, () => `server running on port ${PORT}`);
