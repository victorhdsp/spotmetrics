import { type Request, type Response, Router } from "express";
import asyncHandler from "express-async-handler";
import playerController from "../controllers/playerController";

const routes = Router();

routes.get(
	"/",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.getAll(req);
		res.status(200).json(result);
	}),
);

routes.get(
	"/ranking",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.getRanking();
		res.status(200).json(result);
	}),
);

routes.get(
	"/createTeam",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.createTeams(req);
		res.status(200).json(result);
	}),
);

routes.get(
	"/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.get(req);
		res.status(200).json(result);
	}),
);

routes.post(
	"/",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.create(req);
		res.status(201).json(result);
	}),
);

routes.delete(
	"/:id",
	asyncHandler(async (req: Request, res: Response) => {
		await playerController.delete(req);
		res.status(200).json({ message: "ok" });
	}),
);

routes.put(
	"/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const result = await playerController.change(req);
		res.status(200).json(result);
	}),
);

export default routes;
