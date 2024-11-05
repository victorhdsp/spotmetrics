import playerModel from "../../model/playerModel";
import type { PlayerComplete } from "../../utils/types/player";

type Output = Promise<PlayerComplete[]>;

async function getRankingPlayers(): Output {
	const response = await playerModel.getRanking();
	return response;
}

export default getRankingPlayers;
