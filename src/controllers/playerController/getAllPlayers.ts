import type { Request } from "express";
import playerService from "../../service/playerService";
import type { PlayerResumed } from "../../utils/types/player";

interface OutputGetAllPlayers {
	players: PlayerResumed[];
	total: number;
	next: string | null;
	prev: string | null;
}

export type AllPlayersParams = {
	name?: string;
	username?: string;
	size?: number;
	page: number;
};

async function getAllPlayers(req: Request): Promise<OutputGetAllPlayers> {
	const params: AllPlayersParams = {
		name: req.query.name ? `${req.query.name}` : undefined,
		username: req.query.username ? `${req.query.username}` : undefined,
		size: req.query.limit ? Number(`${req.query.limit}`) : undefined,
		page: Number(`${req.query.offset || 1}`),
	};
	const { players, total } = await playerService.getAll(params);
	const next = `/v1/players?limit=${params.size}&offset=${params.page + 1}`;
	const prev = `/v1/players?limit=${params.size}&offset=${params.page - 1}`;
	const size = params.size ? params.size : players.length;

	return {
		players,
		total,
		next: params.size && params.page * size < total ? next : null,
		prev: params.size && params.page > 0 ? prev : null,
	};
}

export default getAllPlayers;
