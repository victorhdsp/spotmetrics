import notFoundError from "../../errors/notFound";
import playerModel from "../../model/playerModel";
import type { PlayerComplete } from "../../utils/types/player";

type Output = Promise<PlayerComplete>;

async function getUniquePlayer(id: string): Output {
	const prisma = await playerModel.get(id);
	if (!prisma) throw new notFoundError("Jogador não encontrado");
	return prisma;
}

export default getUniquePlayer;
