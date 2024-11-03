import { IPlayerDefault } from "../../utils/types";
import prisma from "../../../prisma/database";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

type Data = IPlayerDefault;
type Output = Prisma.Prisma__PlayerClient<{
    id: string;
    name: string;
    username: string | null;
    createdAt: Date;
    skills: {
        id: string;
        power: number;
        speed: number;
        dribble: number | null;
        playerId: string;
    };
}, never, DefaultArgs>;

function createPlayer(data: Data): Output {
    try {
        const player = prisma.player.create({
            data: {
                id: data.id,
                name: data.name,
                username: data.username,
                createdAt: data.createdAt,
                skills: {
                    create: {
                        power: data.skills.power,
                        speed: data.skills.speed,
                        dribble: data.skills.dribble,
                        playerId: data.id
                    }
                }
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                username: true,
                skills: true
            }
        })
        return player;
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default createPlayer;