import playerService from "../service/playerService";
import { Request } from "express";
import { AllPlayersParams } from "../model/playerModel/getAllPlayers";
import { PlayerComplete, PlayerResumed } from "../utils/types";

async function createPlayer(req: Request): Promise<PlayerComplete> {
    const data = req.body;
    return playerService.create(data);
}
async function deletePlayer(req: Request): Promise<Boolean> {
    const id = req.params.id;
    return playerService.delete(id);
}
async function changePlayer(req: Request): Promise<PlayerComplete> {
    const id = req.params.id;
    const data = req.body;
    return playerService.change(id, data);
}
async function getUniquePlayer(req: Request): Promise<PlayerComplete> {
    const id = req.params.id;
    return playerService.get(id);
}
async function getAllPlayers(req: Request): Promise<PlayerResumed[]> {
    const params: AllPlayersParams = {
        name: `${req.query.name}`,
        username: `${req.query.username}`,
        size: parseInt(`${req.query.size || 10}`),
        page: parseInt(`${req.query.page || 1}`)
    } 
    return playerService.getAll(params);
}

const playerController = {
    create: createPlayer,
    delete: deletePlayer,
    change: changePlayer,
    get: getUniquePlayer,
    getAll: getAllPlayers
}
export default playerController;