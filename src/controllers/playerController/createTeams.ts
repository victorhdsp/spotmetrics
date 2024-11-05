import type { Request } from "express";
import playerService from "../../service/playerService";
import type { PlayerComplete } from "../../utils/types/player";

export interface OutputCreateTeams {
	team1: PlayerComplete[];
	team2: PlayerComplete[];
}

export interface CreateTeamsParams {
	size?: number;
}

async function createTeams(req: Request): Promise<OutputCreateTeams> {
	const params: CreateTeamsParams = {
		size: req.query.limit ? Number(`${req.query.limit}`): undefined
	};
	const players = await playerService.createTeams(params);
	return players;
}

export default createTeams;
