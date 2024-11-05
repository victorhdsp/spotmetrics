import changePlayer from "./changePlayer";
import countAllPlayers from "./countAllPlayers";
import createPlayer from "./createPlayer";
import deletePlayer from "./deletePlayer";
import getAllPlayers from "./getAllPlayers";
import getUniquePlayer from "./getUniquePlayer";

const playerModel = {
	create: createPlayer,
	delete: deletePlayer,
	change: changePlayer,
	get: getUniquePlayer,
	getAll: getAllPlayers,
	countAll: countAllPlayers,
};
export default playerModel;
