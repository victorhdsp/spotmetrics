import notFoundError from "../../errors/notFound";
import playerModel from "../../model/playerModel";
import type { PlayerChangeInput, PlayerComplete } from "../../utils/types/player";
import { PlayerChangeSchema } from "../../utils/zod/schemas";
import { zParse } from "../../utils/zod/zParse";

type Data = PlayerChangeInput;
type Output = Promise<PlayerComplete>;

async function changePlayer(id: string, data: Data): Output {
	const resolvedData = await zParse(PlayerChangeSchema, data);
	const playerExist = await playerModel.get(id);
	if (!playerExist) throw new notFoundError("Jogador não encontrado");
	const prisma = await playerModel.change(id, resolvedData);
	if (!prisma) throw new Error("Ocorrou um erro inesperado");
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

export default changePlayer;
