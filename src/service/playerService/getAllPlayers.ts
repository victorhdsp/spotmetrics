import playerModel from "../../model/playerModel";
import type { AllPlayersParams } from "../../model/playerModel/getAllPlayers";
import type { PlayerResumed } from "../../utils/types/player";

type Output = Promise<{
	players: PlayerResumed[]
	total: number
}>;

async function getAllPlayers(params: AllPlayersParams): Output {
	try {
		const response = await playerModel.getAll(params);
		const players: PlayerResumed[] = response.map((player) => {
			const resolvedPlayer: PlayerResumed = {
				id: player.id,
				name: player.name,
				username: player.username,
				createdAt: player.createdAt,
			};
			return resolvedPlayer;
		});
		const total = await playerModel.countAll(params);
		return {
			players,
			total,
		};
	} catch (error) {
		const err: Error = error as any;
		throw new Error(err.message);
	}
}

export default getAllPlayers;
