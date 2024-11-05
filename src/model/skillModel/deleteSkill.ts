import prisma from "../../../prisma/database";

type Output = Promise<boolean>;

async function deleteSkill(id: string): Output {
	const skill = await prisma.skill.delete({
		where: {
			id: id,
		}
	});
	return !!skill;
}

export default deleteSkill;
