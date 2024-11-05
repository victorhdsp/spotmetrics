import type { Request } from "express";
import playerService from "../../service/playerService";
import type { PlayerComplete } from "../../utils/types/player";
import createTeams from "./createTeams";
import getAllPlayers from "./getAllPlayers";

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

async function getRankingPlayers(): Promise<PlayerComplete[]> {
	const players = await playerService.getRanking();
	return players;
}

const playerController = {
	create: createPlayer,
	delete: deletePlayer,
	change: changePlayer,
	get: getUniquePlayer,
	getAll: getAllPlayers,
	getRanking: getRankingPlayers,
	createTeams: createTeams,
};

export default playerController;
