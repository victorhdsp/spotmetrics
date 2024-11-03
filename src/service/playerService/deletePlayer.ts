import playerModel from "../../model/playerModel";

type Output = Promise<Boolean>;

async function deletePlayer(id: string): Output {
    try {
        return await playerModel.delete(id);
    } catch (error) {
        const err: Error = error as any;
        throw new Error(err.message);
    }
}

export default deletePlayer;