import notFoundError from "../../errors/notFound";
import playerModel from "../../model/playerModel";
import playerSkill from "../../model/skillModel";

type Output = Promise<boolean>;

async function deletePlayer(id: string): Output {
	const prisma = await playerModel.get(id);
	if (!prisma) throw new notFoundError("Jogador não encontrado");
	const hasPlayerDeleted = await playerModel.delete(prisma.id);
	if (!hasPlayerDeleted) throw new Error("Ocorreu um erro inesperado");
	const hasSkillDeleted = await playerSkill.delete(prisma.skillId);
	if (!hasSkillDeleted) throw new Error("Ocorreu um erro inesperado");
	return hasPlayerDeleted && hasSkillDeleted;
}

export default deletePlayer;
