import { type Request, type Response, Router } from "express";
import asyncHandler from "express-async-handler"
import playerController from "../controllers/playerController";

const route = Router();

route.get("/", asyncHandler(async (req: Request, res: Response) => {
	const result = await playerController.getAll(req);
	res.status(200).json(result);
}));

route.get("/:id", asyncHandler(async (req: Request, res: Response) => {;
	const result = await playerController.get(req);
	res.status(200).json(result);
}));

route.post("/", asyncHandler(async (req: Request, res: Response) => {
	const result = await playerController.create(req);
	res.status(201).json(result);
}));

route.delete("/:id", asyncHandler(async (req: Request, res: Response) => {
	await playerController.delete(req);
	res.status(200).json({ message: "ok" });
}));

route.put("/:id", asyncHandler(async (req: Request, res: Response) => {
	const result = await playerController.change(req);
	res.status(200).json(result);
}));

export default route;
