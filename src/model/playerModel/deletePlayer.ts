import prisma from "../../../prisma/database";

type Output = Promise<Boolean>;

async function deletePlayer(id: string): Output {
    const player = await prisma.player.delete({
        where: {
            id: id
        }
    });
    return player ? true : false;
}

export default deletePlayer;