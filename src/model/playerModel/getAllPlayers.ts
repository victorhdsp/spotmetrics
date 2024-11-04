import type { Prisma } from "@prisma/client";
import prisma from "../../../prisma/database";

type Output = Prisma.PrismaPromise<
	{
		name: string;
		id: string;
		username: string | null;
		createdAt: Date;
	}[]
>;

export type AllPlayersParams = {
	name?: string;
	username?: string;
	size?: number;
	page: number;
};

function getAllPlayers(params: AllPlayersParams): Output {
	const { name, username, size, page } = params;
	const skip = size && page ? size * (page - 1): undefined;
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
		skip,
	});
	return players;
}

export default getAllPlayers;
