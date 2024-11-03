import { PlayerComplete, PlayerCreateInput, Skill } from "../../utils/types";
import { PlayerCreateSchema } from "../../utils/schemas";
import playerModel from "../../model/playerModel";
import { randomUUID } from "crypto";

type Data = PlayerCreateInput;
type Output = Promise<PlayerComplete>;

async function createPlayer(data: Data): Output {
    try {
        const resolvedData = PlayerCreateSchema.parse(data);
        const prisma = await playerModel.create({
            id: randomUUID(),
            createdAt: resolvedData.createdAt || new Date(),
            ...resolvedData
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
            }
        };
        return player;
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default createPlayer;