import playerModel from "../../model/playerModel";
import { PlayerComplete } from "../../utils/types";

type Output = Promise<PlayerComplete>;

async function getUniquePlayer(id: string): Output {
    try {
        const prisma = await playerModel.get(id);
        if (!prisma) 
            throw new Error("Jogador não encontrado.");
        return prisma;
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default getUniquePlayer;