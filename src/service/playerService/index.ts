import changePlayer from "./changePlayer";
import createPlayer from "./createPlayer";
import deletePlayer from "./deletePlayer";
import getAllPlayers from "./getAllPlayers";
import getUniquePlayer from "./getUniquePlayer";

const playerService = {
	create: createPlayer,
	delete: deletePlayer,
	change: changePlayer,
	get: getUniquePlayer,
	getAll: getAllPlayers,
};
export default playerService;
