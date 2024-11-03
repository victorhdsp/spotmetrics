import { type Request, type Response, Router } from "express"
import playerController from "../controllers/playerController";

const route = Router();
route.get("/", async (req: Request, res: Response) => {
	const result = await playerController.getAll(req);
	res.status(200).json(result);
});
route.get("/:id", async (req: Request, res: Response) => {
	const result = await playerController.get(req);
	res.status(200).json(result);
});
route.post("/", async (req: Request, res: Response) => {
	const result = await playerController.create(req);
	res.status(201).json(result);
});
route.delete("/:id", async (req: Request, res: Response) => {
	await playerController.delete(req);
	res.status(200).json({ message: "ok" });
});
route.put("/:id", async (req: Request, res: Response) => {
	const result = await playerController.get(req);
	res.status(200).json(result);
});
export default route;