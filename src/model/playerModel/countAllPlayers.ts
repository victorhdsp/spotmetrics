import type { Prisma } from "@prisma/client";
import prisma from "../../../prisma/database";
import type { AllPlayersParams } from "./getAllPlayers";

type Output = Prisma.PrismaPromise<number>;

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
