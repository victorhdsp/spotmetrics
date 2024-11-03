import { type Request, type Response, Router } from "express"
import playerController from "../controllers/playerController";

const route = Router();
route.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "all content" });
});
route.get("/:id", (req: Request, res: Response) => {
	res.status(200).json({ message: "unique content" });
});
route.post("/", async (req: Request, res: Response) => {
	const user = await playerController.create(req);
	res.status(201).json({ user });
});
route.delete("/:id", async (req: Request, res: Response) => {
	await playerController.delete(req);
	res.status(200).json({ message: "ok" });
});
route.put("/:id", (req: Request, res: Response) => {
	res.status(200).json({ message: "changed" });
});
export default route;