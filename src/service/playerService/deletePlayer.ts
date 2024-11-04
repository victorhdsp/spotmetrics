import notFoundError from "../../errors/notFound";
import playerModel from "../../model/playerModel";

type Output = Promise<boolean>;

async function deletePlayer(id: string): Output {
	const prisma = await playerModel.get(id);
	if (!prisma) throw new notFoundError("Jogador não encontrado");
	const exist = await playerModel.delete(id);
	if (!exist) throw new Error("Ocorreu um erro inesperado");
	return exist;
}

export default deletePlayer;
