import prisma from "../../../prisma/database";

type Output = Promise<boolean>;

async function deletePlayer(id: string): Output {
	const player = await prisma.player.delete({
		where: {
			id: id,
		},
	});
	return !!player;
}

export default deletePlayer;
