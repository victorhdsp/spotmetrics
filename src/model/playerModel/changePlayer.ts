import type { Prisma } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import prisma from "../../../prisma/database";
import type { PlayerChangeInput } from "../../utils/types/player";

type Data = PlayerChangeInput;
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
	},
	never,
	DefaultArgs
>;

function changePlayer(id: string, data: Data): Output {
	try {
		const player = prisma.player.update({
			where: {
				id,
			},
			data: {
				name: data?.name,
				username: data?.username,
				createdAt: data?.createdAt,
				skills: {
					update: {
						power: data?.skills?.power,
						speed: data?.skills?.speed,
						dribble: data?.skills?.dribble,
					},
				}
			},
			select: {
				id: true,
				name: true,
				createdAt: true,
				username: true,
				skills: true,
			},
		});
		return player;
	} catch (error) {
		const err: Error = error as any;
		throw new Error(err.message);
	}
}

export default changePlayer;
