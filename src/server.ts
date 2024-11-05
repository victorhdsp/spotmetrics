import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { innitialize } from "../prisma/database";
import errorMiddleware from "./middleware/error";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const corsOptions: cors.CorsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
};

innitialize().then(() => {
	const app = express();
	app.use(cors(corsOptions));
	app.use(express.json());
	app.use(routes);
	app.use(errorMiddleware);
	return app.listen(PORT, () => `server running on port ${PORT}`);
});
