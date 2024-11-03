import { PlayerComplete, PlayerChangeInput } from "../../utils/types";
import { PlayerChangeSchema } from "../../utils/schemas";
import playerModel from "../../model/playerModel";

type Data = PlayerChangeInput;
type Output = Promise<PlayerComplete>;

async function changePlayer(id: string, data: Data): Output {
    try {
        const resolvedData = PlayerChangeSchema.parse(data);
        const prisma = await playerModel.change(id, resolvedData);
        const player: PlayerComplete = {
            id: prisma.id,
            name: prisma.name,
            username: prisma.username,
            createdAt: prisma.createdAt,
            skills: {
                dribble: prisma.skills.dribble,
                power: prisma.skills.power,
                speed: prisma.skills.speed,
            }
        };
        return player;
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default changePlayer;