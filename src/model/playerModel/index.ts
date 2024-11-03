import createPlayer from "./createPlayer";
import deletePlayer from "./deletePlayer";
import changePlayer from "./changePlayer";
import getUniquePlayer from "./getUniquePlayer";
import getAllPlayers from "./getAllPlayers";

const playerModel = {
    create: createPlayer,
    delete: deletePlayer,
    change: changePlayer,
    get: getUniquePlayer,
    getAll: getAllPlayers
}
export default playerModel;