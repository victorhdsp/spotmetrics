import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "../../../prisma/database";

type Output = Prisma.Prisma__PlayerClient<
	{
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
	} | null,
	null,
	DefaultArgs
>;

function getUniquePlayer(id: string): Output {
	const player = prisma.player.findUnique({
		where: {
			id: id,
		},
		select: {
			name: true,
			id: true,
			username: true,
			createdAt: true,
			skills: true,
		},
	});
	return player;
}

export default getUniquePlayer;
