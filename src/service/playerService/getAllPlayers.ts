import playerModel from "../../model/playerModel";
import { AllPlayersParams } from "../../model/playerModel/getAllPlayers";
import { PlayerResumed } from "../../utils/types";

type Output = Promise<PlayerResumed[]>;

async function getAllPlayers(params: AllPlayersParams): Output {
    try {
        return playerModel.getAll(params);
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default getAllPlayers;