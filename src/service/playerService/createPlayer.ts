import { randomUUID } from "node:crypto";
import playerModel from "../../model/playerModel";
import type {
	PlayerComplete,
	PlayerCreateInput,
} from "../../utils/types/player";
import { PlayerCreateSchema } from "../../utils/zod/schemas";
import { zParse } from "../../utils/zod/zParse";

type Data = PlayerCreateInput;
type Output = Promise<PlayerComplete>;

async function createPlayer(data: Data): Output {
	const resolvedData = await zParse(PlayerCreateSchema, data);
	const prisma = await playerModel.create({
		id: randomUUID(),
		createdAt: resolvedData.createdAt || new Date(),
		...resolvedData,
	});
	const player: PlayerComplete = {
		id: prisma.id,
		name: prisma.name,
		username: prisma.username,
		createdAt: prisma.createdAt,
		skills: {
			dribble: prisma.skills.dribble,
			power: prisma.skills.power,
			speed: prisma.skills.speed,
		},
	};
	return player;
}

export default createPlayer;
