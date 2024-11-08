import changePlayer from "./changePlayer";
import createPlayer from "./createPlayer";
import createTeams from "./createTeams";
import deletePlayer from "./deletePlayer";
import getAllPlayers from "./getAllPlayers";
import getRankingPlayers from "./getRanking";
import getUniquePlayer from "./getUniquePlayer";

const playerService = {
	create: createPlayer,
	delete: deletePlayer,
	change: changePlayer,
	get: getUniquePlayer,
	getAll: getAllPlayers,
	getRanking: getRankingPlayers,
	createTeams: createTeams,
};
export default playerService;
