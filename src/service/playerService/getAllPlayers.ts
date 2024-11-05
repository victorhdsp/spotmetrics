import type { AllPlayersParams } from "../../controllers/playerController/getAllPlayers";
import playerModel from "../../model/playerModel";
import type { PlayerResumed } from "../../utils/types/player";

type Output = Promise<{
	players: PlayerResumed[];
	total: number;
}>;

async function getAllPlayers(params: AllPlayersParams): Output {
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
}

export default getAllPlayers;
