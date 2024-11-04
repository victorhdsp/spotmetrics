import type { Prisma } from "@prisma/client";
import prisma from "../../../prisma/database";

type Output = Prisma.PrismaPromise<number>;

export type AllPlayersParams = {
	name: string;
	username: string;
	size: number;
	page: number;
};

function countAllPlayers(params: AllPlayersParams): Output {
	const { name, username } = params;
	const total = prisma.player.count({
		where: {
			name: {
				contains: name,
			},
			username: {
				contains: username,
			},
		},
	});
	return total;
}

export default countAllPlayers;
