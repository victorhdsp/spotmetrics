import type { Request } from "express";
import type { AllPlayersParams } from "../model/playerModel/getAllPlayers";
import playerService from "../service/playerService";
import type { PlayerComplete, PlayerResumed } from "../utils/types/player";

function createPlayer(req: Request): Promise<PlayerComplete> {
	const data = req.body;
	return playerService.create(data);
}

function deletePlayer(req: Request): Promise<boolean> {
	const id = req.params.id;
	return playerService.delete(id);
}

function changePlayer(req: Request): Promise<PlayerComplete> {
	const id = req.params.id;
	const data = req.body;
	return playerService.change(id, data);
}

function getUniquePlayer(req: Request): Promise<PlayerComplete> {
	const id = req.params.id;
	return playerService.get(id);
}

interface OutputGetAllPlayers {
	players: PlayerResumed[];
	total: number;
	next: string | null;
	prev: string | null;
}
async function getAllPlayers(req: Request): Promise<OutputGetAllPlayers> {
	const params: AllPlayersParams = {
		name: req.query.name ?`${req.query.name}` : undefined,
		username: req.query.username ? `${req.query.username}` : undefined,
		size: req.query.limit ? Number(`${req.query.limit}`) : undefined,
		page: Number(`${req.query.offset || 1}`) ,
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

const playerController = {
	create: createPlayer,
	delete: deletePlayer,
	change: changePlayer,
	get: getUniquePlayer,
	getAll: getAllPlayers,
};
export default playerController;
