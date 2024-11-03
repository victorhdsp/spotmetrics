import prisma from "../../../prisma/database";
import { Prisma } from "@prisma/client";

type Output = Prisma.PrismaPromise<{
    name: string;
    id: string;
    username: string | null;
    createdAt: Date;
}[]>;

export type AllPlayersParams = {
    name: string;
    username: string;
    size: number;
    page: number;
};

function getAllPlayers(params: AllPlayersParams): Output {
    const { name, username, size } = params;
    const players = prisma.player.findMany({
        where: {
            name: {
                contains: name,
            },
            username: {
                contains: username,
            },
        },
        take: size,
        skip: size * (params.page - 1),
    });
    return players;
}

export default getAllPlayers;