import type { CreateTeamsParams, OutputCreateTeams } from "../../controllers/playerController/createTeams";
import playerService from "../../service/playerService";
import type { PlayerComplete } from "../../utils/types/player";

function getPlayerPower(player: PlayerComplete) {
	const { power, speed, dribble } = player.skills;
	return power + speed + (dribble || 0);
}

function getTeamPower(team: PlayerComplete[]) {
	return team.reduce((acc, player) => acc + getPlayerPower(player), 0);
}

function orderTeamByPower(players: PlayerComplete[]) {
	return players.sort((a, b) => getPlayerPower(a) - getPlayerPower(b));
}

function randomPlayer(players: PlayerComplete[], size: number) {
	const team1: PlayerComplete[] = [];
	const team2: PlayerComplete[] = [];

	const index = Math.floor(Math.random() * players.length);
	const player = players[index];
	players.splice(index, 1);
	
	if (team1.length < size && team2.length < size) {
		if (team1.length < team2.length) {
			team1.push(player);
		} else {
			team2.push(player);
		}
	}
	const team1Power = getTeamPower(team1);
	const team2Power = getTeamPower(team2);
	if (team1Power < team2Power) {
		return { 
			lower: orderTeamByPower(team1),
			higher: orderTeamByPower(team2),
			unusedPlayers: orderTeamByPower(players)
		};
	}
	return { 
		lower: orderTeamByPower(team2),
		higher: orderTeamByPower(team1),
		unusedPlayers: orderTeamByPower(players)
	};
}

async function createTeams(params: CreateTeamsParams): Promise<OutputCreateTeams> {
	const tradeCount = 5;
	let index = 0;
	params.size = params.size ? params.size : 5;
	const players = await playerService.getRanking();
	const { lower:bLower, higher, unusedPlayers } = randomPlayer(players, params.size);
	const higherPower = getTeamPower(higher);
	let lower = bLower;

	while (index < tradeCount) {
		const lowerPower = getTeamPower(lower);
		if (Math.abs(higherPower - lowerPower) < 10)
			break;
		if (unusedPlayers.length > 0) {
			if (getPlayerPower(unusedPlayers[0]) < getPlayerPower(lower[0]))
				unusedPlayers.shift();
			lower[0] = unusedPlayers[0];
			unusedPlayers.shift();
			lower = orderTeamByPower(bLower)
		} else {
			const swap: PlayerComplete = lower[index];
			lower[index] = higher[tradeCount - index];
			higher[index] = swap;
			index++;
		}
	}
	return {
		team1: lower,
		team2: higher
	};
}

export default createTeams;